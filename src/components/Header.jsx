import React from 'react';
import '../styles/header.css';

function Header({ userRole, setUserRole }) {
  const toggleRole = () => {
    setUserRole(userRole === 'viewer' ? 'admin' : 'viewer');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">💰 Finance Dashboard</h1>
        </div>
        <div className="header-right">
          <button 
            className={`role-toggle ${userRole}`}
            onClick={toggleRole}
            aria-label="Toggle user role"
          >
            <span className="role-icon">👤</span>
            <span className="role-text">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;