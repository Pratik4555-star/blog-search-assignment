import { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [tags, setTags] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/search', {
        params: { query, tags },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Blog Search</h1>
      </header>
      <main className="main">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="results">
          {results.length > 0 ? (
            results.map((result, index) => (
              <div key={index} className="result">
                <h2>{result.title}</h2>
                <p>{result.content}</p>
                <p><strong>Tags:</strong> {result.tags.join(', ')}</p>
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
