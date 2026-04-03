import React, { useContext } from 'react';
import { AppContext } from '../App';
import SummaryCard from '../components/SummaryCard';
import BalanceTrendChart from '../components/BalanceTrendChart';
import SpendingBreakdown from '../components/SpendingBreakdown';
import '../styles/dashboard.css';

function Dashboard() {
  const { transactions } = useContext(AppContext);

  // Calculate summary data
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  // Calculate trends (simplified - comparing to previous data)
  const incomeTrend = 12;
  const expenseTrend = -8;

  return (
    <div className="dashboard">
      <h2 className="page-title">Welcome Back! 👋</h2>
      
      <div className="summary-cards-grid">
        <SummaryCard
          title="Total Balance"
          amount={totalBalance}
          icon="💰"
          trend={5}
          color="primary"
        />
        <SummaryCard
          title="Total Income"
          amount={totalIncome}
          icon="📈"
          trend={incomeTrend}
          color="success"
        />
        <SummaryCard
          title="Total Expenses"
          amount={totalExpense}
          icon="📉"
          trend={expenseTrend}
          color="danger"
        />
      </div>

      <div className="charts-grid">
        <BalanceTrendChart />
        <SpendingBreakdown />
      </div>
    </div>
  );
}

export default Dashboard;