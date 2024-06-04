import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cancelIcon from "../../data/cancel.svg";
import { Modal } from 'antd';
import Login from './Login';

interface Paper {
  id: string;
  title: string;
  abstract: string;
  type: string;
  authors: { first_name: string; last_name: string }[];
  keywords?: string[];
  last_modified: string;
}

const Papers: React.FC = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchPapers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No access token found');
        setIsModalOpen(true);
        return;
      }

      let papersList: Paper[] = [];

      try {
        while (papersList.length < 20) {
          const response = await axios.get('https://api.mendeley.com/documents', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              order: 'desc',
              sort: 'last_modified',
            },
          });

          papersList = papersList.concat(response.data);
          if (papersList.length >= 20) break;
        }
        setPapers(papersList.slice(0, 20));
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          setError('Invalid access token');
          setIsModalOpen(true);
        } else {
          setError('Error fetching papers: ' + (error.response?.data || error.message));
        }
        console.error('Error fetching papers', error);
      }
    };

    fetchPapers();
  }, []);

  return (
    <div>
      <h1>Your Papers</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {papers.map((paper) => (
          <li key={paper.id}>
            <h2>{paper.title}</h2>
            <p>{paper.abstract}</p>
            <p>Type: {paper.type}</p>
            <p>Authors: {paper.authors ? paper.authors.map(author => `${author.first_name} ${author.last_name}`).join(', ') : 'No authors available'}</p>
            {paper.keywords && <p>Keywords: {paper.keywords.join(', ')}</p>}
            <p>Last Modified: {new Date(paper.last_modified).toLocaleString()}</p>
          </li>
        ))}
      </ul>
      <Modal
        title="Error"
        visible={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        closable={false}
      >
        <Login />
      </Modal>
    </div>
  );
};

export default Papers;
