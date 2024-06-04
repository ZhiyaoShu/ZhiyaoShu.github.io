import axios from 'axios';
import { Papers } from './FetchPapers';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://api.semanticscholar.org/graph/v1/paper/search', {
        params: {
          query: query,
          limit: '5',
          publicationTypes: 'JournalArticle',
          year: '2018-',
          fields: 'title,publicationTypes,publicationDate'
        }
      });
      if (response.status == 200) {
        setResults(response.data.data);
      }
    } catch (error) {
      setError('Error fetching papers: ' + error.message);
      console.error('Error fetching papers', error);
    }
  };

}