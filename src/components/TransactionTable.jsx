import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import '../styles/transaction-table.css';

function TransactionTable({ showEditButton = false }) {
  const { transactions } = useContext(AppContext);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  let filteredTransactions = transactions;

  // Filter by type
  if (filterType !== 'all') {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }

  // Filter by search term
  if (searchTerm) {
    filteredTransactions = filteredTransactions.filter(t =>
      t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Sort
  filteredTransactions.sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    if (sortBy === 'date') {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }

    const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="transaction-table-container">
      <div className="table-filters">
        <input
          type="text"
          placeholder="🔍 Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table className="transaction-table">
          <thead>
            <tr>
              <th onClick={() => toggleSort('date')} className="sortable">
                Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th onClick={() => toggleSort('amount')} className="sortable">
                Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              {showEditButton && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map(transaction => (
                <tr key={transaction.id} className={`row-${transaction.type}`}>
                  <td className="date-cell">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td>{transaction.description}</td>
                  <td>
                    <span className="category-badge">{transaction.category}</span>
                  </td>
                  <td>
                    <span className={`type-badge type-${transaction.type}`}>
                      {transaction.type === 'income' ? '📈 Income' : '📉 Expense'}
                    </span>
                  </td>
                  <td className={`amount-cell ${transaction.type}`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                  </td>
                  {showEditButton && (
                    <td>
                      <button className="edit-btn">✏️ Edit</button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr className="empty-row">
                <td colSpan={showEditButton ? 6 : 5} className="empty-message">
                  📭 No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="table-info">
        Showing {filteredTransactions.length} of {transactions.length} transactions
      </div>
    </div>
  );
}

export default TransactionTable;