import React from 'react';
import bibData from './parsedBib.json';

type BibEntry = {
  entryTags: {
    title: string;
    author: string;
    year: string;
    pdf?: string;
    url?: string;
  };
};

const Bibliography: React.FC = () => {
  return (
    <div>
      <div>
        {bibData.map((entry: BibEntry, index: number) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h2>{entry.entryTags.title}</h2>
            <p><strong>Author:</strong> {entry.entryTags.author}</p>
            <p><strong>Year:</strong> {entry.entryTags.year}</p>
            {entry.entryTags.pdf && (
              <p>
                <a
                  href={`/path/to/pdf/${entry.entryTags.pdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read PDF
                </a>
              </p>
            )}
            {entry.entryTags.url && (
              <p>
                <a
                  href={entry.entryTags.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Online
                </a>
              </p>
            )}
            <img
              src="/path/to/your/image.jpg"
              alt="Sample Image"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bibliography;