import React, { useContext } from 'react';
import { AppContext } from '../App';
import '../styles/chart.css';

function SpendingBreakdown() {
  const { transactions } = useContext(AppContext);

  const categories = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    });

  const total = Object.values(categories).reduce((a, b) => a + b, 0);
  const categoryList = Object.entries(categories).sort((a, b) => b[1] - a[1]);

  const colors = ['#4a90e2', '#f5a623', '#7ed321', '#bd10e0', '#50e3c2', '#ff6b6b'];

  return (
    <div className="chart-container">
      <h3 className="chart-title">Spending Breakdown</h3>
      <div className="pie-chart-container">
        <svg viewBox="0 0 200 200" className="pie-chart">
          {categoryList.map((item, index) => {
            const [category, amount] = item;
            const percentage = (amount / total) * 100;
            const startAngle = categoryList.slice(0, index).reduce((sum, [, amt]) => sum + (amt / total) * 360, 0);
            const endAngle = startAngle + (percentage / 100) * 360;

            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;

            const x1 = 100 + 70 * Math.cos(startRad);
            const y1 = 100 + 70 * Math.sin(startRad);
            const x2 = 100 + 70 * Math.cos(endRad);
            const y2 = 100 + 70 * Math.sin(endRad);

            const largeArc = percentage > 50 ? 1 : 0;

            const pathData = [
              `M 100 100`,
              `L ${x1} ${y1}`,
              `A 70 70 0 ${largeArc} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');

            return (
              <path
                key={category}
                d={pathData}
                fill={colors[index % colors.length]}
                className="pie-segment"
              />
            );
          })}
          <circle cx="100" cy="100" r="40" fill="white" />
        </svg>
      </div>
      <div className="chart-legend">
        {categoryList.map((item, index) => {
          const [category, amount] = item;
          const percentage = ((amount / total) * 100).toFixed(1);
          return (
            <div key={category} className="legend-item">
              <span 
                className="legend-color" 
                style={{ backgroundColor: colors[index % colors.length] }}
              ></span>
              <span className="legend-label">{category}</span>
              <span className="legend-value">{percentage}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SpendingBreakdown;