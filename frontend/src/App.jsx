import { useState } from 'react';
import SearchForm from './components/SearchForm';
import ResultCard from './components/ResultCard';

export default function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [searchInfo, setSearchInfo] = useState(null);

  // API base URL - uses Render backend in production, localhost in dev
  const API_BASE_URL =
    import.meta.env.MODE === 'production'
      ? 'https://emergency-partner-v2-1.onrender.com/api'
      : '/api';

  const handleSearch = async (city, emergencyType, description) => {
    setLoading(true);
    setMessage('');
    setResults([]);

    try {
      const res = await fetch(`${API_BASE_URL}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city, emergencyType, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'Failed to search');
        return;
      }

      setResults(data.results);
      setSearchInfo({ type: data.type, city, count: data.count });

      if (data.count === 0) {
        setMessage(`No resources found in ${city} for this type.`);
      }
    } catch (err) {
      setMessage('Error connecting to server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>AI Emergency Resource Finder</h1>
        <p>Find emergency help nearby instantly — powered by offline data and simple AI.</p>
      </header>

      <SearchForm onSearch={handleSearch} loading={loading} />

      {loading && <div className="loading">Searching...</div>}

      {message && (
        <div className={`message ${results.length === 0 ? 'error' : 'info'}`}>{message}</div>
      )}

      {searchInfo && (
        <div className="search-info">
          Results for <strong>{searchInfo.type}</strong> in <strong>{searchInfo.city}</strong> (
          {searchInfo.count} found)
        </div>
      )}

      <div className="results">
        {results.map((resource, idx) => (
          <ResultCard key={idx} resource={resource} />
        ))}
      </div>
    </div>
  );
}
