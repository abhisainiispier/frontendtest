import React from 'react';
import './StatusCard.css';

const StatusCard = ({ icon, title, status, message, details, isLoading, error }) => {
  const getStatusColor = (stat) => {
    if (error) return 'error';
    if (isLoading) return 'loading';
    switch (stat) {
      case 'online':
      case 'connected':
      case 'success':
      case 'working':
        return 'success';
      case 'offline':
      case 'disconnected':
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  const colorClass = getStatusColor(status);

  return (
    <div className={`status-card status-card--${colorClass}`}>
      <div className="status-card__header">
        <span className="status-card__icon">{icon}</span>
        <h3 className="status-card__title">{title}</h3>
      </div>

      <div className="status-card__body">
        {isLoading && <p className="status-card__loading">Loading...</p>}
        
        {error && (
          <p className="status-card__error">
            {error}
          </p>
        )}

        {!isLoading && !error && (
          <>
            <div className="status-card__indicator">
              <span className={`status-indicator status-indicator--${colorClass}`}></span>
              <span className="status-card__status">{message}</span>
            </div>

            {details && (
              <div className="status-card__details">
                {Array.isArray(details) ? (
                  <ul>
                    {details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{details}</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
