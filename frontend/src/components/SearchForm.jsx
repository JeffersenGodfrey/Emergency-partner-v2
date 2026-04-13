import { useState } from 'react';

const CITIES = ['Chennai', 'Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Kolkata', 'Tirupati', 'Nagpur'];

const EMERGENCY_TYPES = ['Medical Emergency', 'Flood Help', 'Charging Station'];

export default function SearchForm({ onSearch, loading }) {
  const [city, setCity] = useState('');
  const [emergencyType, setEmergencyType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city) {
      alert('Please select your city');
      return;
    }
    if (!emergencyType && !description) {
      alert('Please select an emergency type or describe the emergency');
      return;
    }
    onSearch(city, emergencyType, description);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#c9d1d9' }}>
        Emergency Search Form
      </h2>

      <div className="form-group">
        <label htmlFor="city">Your City</label>
        <select id="city" value={city} onChange={(e) => setCity(e.target.value)} disabled={loading}>
          <option value="">Select a city</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="emergency">Emergency Type</label>
        <select
          id="emergency"
          value={emergencyType}
          onChange={(e) => setEmergencyType(e.target.value)}
          disabled={loading}
        >
          <option value="">Select type (optional)</option>
          {EMERGENCY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="desc">Describe Your Emergency (Optional)</label>
        <textarea
          id="desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Need ambulance near T Nagar"
          disabled={loading}
        />
      </div>

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? 'Searching...' : 'Find Help'}
      </button>
    </form>
  );
}
