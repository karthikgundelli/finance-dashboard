import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import TransactionTable from '../components/TransactionTable';
import '../styles/transactions.css';

function Transactions() {
  const { userRole, addTransaction } = useContext(AppContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    category: 'Groceries',
    type: 'expense',
    amount: '',
  });

  const categories = ['Salary', 'Freelance', 'Groceries', 'Utilities', 'Rent', 'Entertainment', 'Dining', 'Transportation', 'Shopping', 'Other'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || '' : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.description && formData.amount) {
      addTransaction(formData);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: '',
        category: 'Groceries',
        type: 'expense',
        amount: '',
      });
      setShowAddForm(false);
    }
  };

  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <h2 className="page-title">Transactions 📋</h2>
        {userRole === 'admin' && (
          <button 
            className="btn-add-transaction"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? '✕ Cancel' : '+ Add Transaction'}
          </button>
        )}
      </div>

      {showAddForm && userRole === 'admin' && (
        <div className="add-transaction-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                placeholder="e.g., Grocery shopping"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div className="form-group">
                <label>Amount ($)</label>
                <input
                  type="number"
                  name="amount"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-submit">Save Transaction</button>
          </form>
        </div>
      )}

      <TransactionTable showEditButton={userRole === 'admin'} />
    </div>
  );
}

export default Transactions;