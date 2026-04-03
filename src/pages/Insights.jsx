import React, { useContext } from 'react';
import { AppContext } from '../App';
import '../styles/insights.css';

function Insights() {
  const { transactions } = useContext(AppContext);

  // Calculate insights
  const expensesByCategory = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
    });

  const highestSpendingCategory = Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1])[0];
  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const savingsRate = totalIncome > 0 ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1) : 0;

  const recentTransactions = transactions.slice(0, 5);
  const averageTransaction = transactions.length > 0 
    ? (transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length).toFixed(2)
    : 0;

  const getInsightMessage = () => {
    if (savingsRate > 30) return "Great job! You're saving more than 30% of your income.";
    if (savingsRate > 15) return "Good savings rate! Keep it up.";
    if (savingsRate > 0) return "You're saving some money, but consider reducing expenses.";
    return "You're spending more than you earn. Time to review your expenses!";
  };

  return (
    <div className="insights-page">
      <h2 className="page-title">Financial Insights 💡</h2>

      <div className="insights-grid">
        <div className="insight-card">
          <div className="insight-header">
            <h3>Savings Rate</h3>
            <span className="insight-icon">📊</span>
          </div>
          <div className="insight-value">{savingsRate}%</div>
          <p className="insight-message">{getInsightMessage()}</p>
        </div>

        <div className="insight-card">
          <div className="insight-header">
            <h3>Highest Spending Category</h3>
            <span className="insight-icon">🎯</span>
          </div>
          <div className="insight-value">
            {highestSpendingCategory ? highestSpendingCategory[0] : 'N/A'}
          </div>
          <p className="insight-message">
            {highestSpendingCategory 
              ? `You spent $${highestSpendingCategory[1].toFixed(2)} on ${highestSpendingCategory[0]}`
              : 'No expense data available'
            }
          </p>
        </div>

        <div className="insight-card">
          <div className="insight-header">
            <h3>Average Transaction</h3>
            <span className="insight-icon">📈</span>
          </div>
          <div className="insight-value">${averageTransaction}</div>
          <p className="insight-message">Across {transactions.length} transactions</p>
        </div>

        <div className="insight-card">
          <div className="insight-header">
            <h3>Monthly Balance</h3>
            <span className="insight-icon">💰</span>
          </div>
          <div className="insight-value">${(totalIncome - totalExpense).toFixed(2)}</div>
          <p className="insight-message">
            Income: ${totalIncome.toFixed(2)} | Expenses: ${totalExpense.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="insights-section">
        <h3>📌 Key Observations</h3>
        <ul className="observations-list">
          <li>Your largest expense category is <strong>{highestSpendingCategory ? highestSpendingCategory[0] : 'N/A'}</strong></li>
          <li>You have <strong>{transactions.length}</strong> total transactions recorded</li>
          <li>Your savings rate is <strong>{savingsRate}%</strong> of your income</li>
          <li>Average transaction amount is <strong>${averageTransaction}</strong></li>
          {totalExpense > totalIncome && (
            <li className="warning">⚠️ Your expenses exceed your income. Consider creating a budget plan.</li>
          )}
        </ul>
      </div>

      <div className="insights-section">
        <h3>🎯 Recommendations</h3>
        <ul className="recommendations-list">
          <li>Track your spending in {highestSpendingCategory ? highestSpendingCategory[0] : 'discretionary categories'} more closely</li>
          <li>Set a monthly budget for each expense category</li>
          <li>Try to increase your savings rate by 5% next month</li>
          <li>Review subscriptions and recurring expenses</li>
        </ul>
      </div>
    </div>
  );
}

export default Insights;