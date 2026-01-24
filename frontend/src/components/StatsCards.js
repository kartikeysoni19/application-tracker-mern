import React from 'react';
import './StatsCards.css';

const StatsCards = ({ stats }) => {
  const cards = [
    { label: 'Total', value: stats.total, color: '#3b82f6', bgColor: '#dbeafe' },
    { label: 'Applied', value: stats.Applied, color: '#2563eb', bgColor: '#bfdbfe' },
    { label: 'Interviews', value: stats.Interview, color: '#f59e0b', bgColor: '#fef3c7' },
    { label: 'Offers', value: stats.Offer, color: '#10b981', bgColor: '#d1fae5' },
    { label: 'Rejected', value: stats.Rejected, color: '#ef4444', bgColor: '#fee2e2' }
  ];

  return (
    <div className="stats-container">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className="stats-card"
          style={{ backgroundColor: card.bgColor }}
        >
          <span className="stats-value" style={{ color: card.color }}>
            {card.value}
          </span>
          <span className="stats-label">{card.label}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
