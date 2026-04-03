import React from 'react';
import '../styles/summary-card.css';

function SummaryCard({ title, amount, icon, trend, color }) {
  const isPositive = trend > 0;

  return (
    <div className={`summary-card card-${color}`}>
      <div className="card-header">
        <span className="card-icon">{icon}</span>
        <span className="card-title">{title}</span>
      </div>
      <div className="card-amount">${amount.toLocaleString()}</div>
      {trend !== undefined && (
        <div className={`card-trend ${isPositive ? 'positive' : 'negative'}`}>
          <span className="trend-icon">{isPositive ? '📈' : '📉'}</span>
          <span className="trend-value">{Math.abs(trend)}% from last month</span>
        </div>
      )}
    </div>
  );
}

export default SummaryCard;