import React, { useState, useContext, createContext } from 'react';
import './styles/app.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';

export const AppContext = createContext();

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userRole, setUserRole] = useState('viewer'); // 'viewer' or 'admin'
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2026-04-03', amount: 2500, category: 'Salary', type: 'income', description: 'Monthly Salary' },
    { id: 2, date: '2026-04-02', amount: 150, category: 'Groceries', type: 'expense', description: 'Whole Foods' },
    { id: 3, date: '2026-04-01', amount: 80, category: 'Utilities', type: 'expense', description: 'Electricity Bill' },
    { id: 4, date: '2026-03-31', amount: 1200, category: 'Rent', type: 'expense', description: 'Monthly Rent' },
    { id: 5, date: '2026-03-30', amount: 45, category: 'Entertainment', type: 'expense', description: 'Movie Tickets' },
    { id: 6, date: '2026-03-29', amount: 120, category: 'Dining', type: 'expense', description: 'Restaurant' },
    { id: 7, date: '2026-03-28', amount: 500, category: 'Freelance', type: 'income', description: 'Project Payment' },
    { id: 8, date: '2026-03-27', amount: 60, category: 'Transportation', type: 'expense', description: 'Gas' },
    { id: 9, date: '2026-03-26', amount: 200, category: 'Shopping', type: 'expense', description: 'Clothing' },
    { id: 10, date: '2026-03-25', amount: 1500, category: 'Salary', type: 'income', description: 'Bonus' },
  ]);

  const addTransaction = (newTransaction) => {
    const transaction = {
      ...newTransaction,
      id: Math.max(...transactions.map(t => t.id), 0) + 1
    };
    setTransactions([transaction, ...transactions]);
  };

  const updateTransaction = (id, updatedData) => {
    setTransactions(transactions.map(t => 
      t.id === id ? { ...t, ...updatedData } : t
    ));
  };

  return (
    <AppContext.Provider value={{ 
      transactions, 
      setTransactions, 
      userRole, 
      setUserRole,
      addTransaction,
      updateTransaction
    }}>
      <div className="app">
        <Header userRole={userRole} setUserRole={setUserRole} />
        <div className="app-container">
          <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <main className="main-content">
            {currentPage === 'dashboard' && <Dashboard />}
            {currentPage === 'transactions' && <Transactions />}
            {currentPage === 'insights' && <Insights />}
          </main>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;