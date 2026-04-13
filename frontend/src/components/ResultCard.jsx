import { useState } from 'react';

export default function ResultCard({ resource }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="result-card">
      <div className="card-header" onClick={() => setExpanded(!expanded)}>
        <div className="card-title-section">
          <h3>{resource.name}</h3>
          <p className="location">{resource.location}</p>
        </div>
        <span className="expand-icon">{expanded ? '▼' : '▶'}</span>
      </div>

      {expanded && (
        <div className="card-details">
          <div className="detail-row">
            <span className="label">Contact</span>
            <span className="value">{resource.contact}</span>
          </div>
          <div className="detail-row">
            <span className="label">Category</span>
            <span className="value">{resource.category}</span>
          </div>
          <div className="detail-row">
            <span className="label">Services</span>
            <div className="services">
              {resource.services.map((service, idx) => (
                <span key={idx} className="service-tag">
                  {service}
                </span>
              ))}
            </div>
          </div>
          <div className="detail-row">
            <span className="label">Updated</span>
            <span className="value">{resource.last_updated}</span>
          </div>
          {resource.is_open && <div className="status-open">Available</div>}
        </div>
      )}
    </div>
  );
}
