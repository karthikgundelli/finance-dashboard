import React from 'react';
import '../styles/chart.css';

function BalanceTrendChart() {
  const data = [
    { month: 'Jan', balance: 3200 },
    { month: 'Feb', balance: 3850 },
    { month: 'Mar', balance: 3450 },
    { month: 'Apr', balance: 4100 },
    { month: 'May', balance: 4750 },
    { month: 'Jun', balance: 5200 },
  ];

  const maxBalance = Math.max(...data.map(d => d.balance));
  const minBalance = Math.min(...data.map(d => d.balance));
  const range = maxBalance - minBalance;

  return (
    <div className="chart-container">
      <h3 className="chart-title">Balance Trend</h3>
      <div className="line-chart">
        <svg viewBox="0 0 600 300" className="chart-svg">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={`grid-${i}`}
              x1="50"
              y1={50 + i * 50}
              x2="580"
              y2={50 + i * 50}
              className="grid-line"
            />
          ))}

          {/* Line path */}
          <polyline
            fill="none"
            stroke="#4a90e2"
            strokeWidth="3"
            points={data.map((d, i) => {
              const x = 50 + (i / (data.length - 1)) * 530;
              const y = 250 - ((d.balance - minBalance) / range) * 200;
              return `${x},${y}`;
            }).join(' ')}
            className="line-path"
          />

          {/* Data points */}
          {data.map((d, i) => {
            const x = 50 + (i / (data.length - 1)) * 530;
            const y = 250 - ((d.balance - minBalance) / range) * 200;
            return (
              <g key={`point-${i}`}>
                <circle cx={x} cy={y} r="4" className="data-point" />
                <circle cx={x} cy={y} r="8" className="data-point-hover" />
              </g>
            );
          })}

          {/* Labels */}
          {data.map((d, i) => {
            const x = 50 + (i / (data.length - 1)) * 530;
            return (
              <text key={`label-${i}`} x={x} y="280" textAnchor="middle" className="chart-label">
                {d.month}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default BalanceTrendChart;