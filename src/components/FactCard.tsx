import React from 'react';

interface FactCardProps {
  title: string;
  value: string | number | null;
  unit?: string;
  description?: string;
  loading: boolean;
  error?: string | null;
  icon?: string;
}

const FactCard: React.FC<FactCardProps> = ({ title, value, unit, description, loading, error, icon }) => {
  return (
    <div className="fact-card">
      <h3>{icon} {title}</h3>
      <div className="card-content">
        {loading ? (
          <div className="spinner">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            <div className="value">
              {value} <span className="unit">{unit}</span>
            </div>
            {description && <p className="description">{description}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default FactCard;
