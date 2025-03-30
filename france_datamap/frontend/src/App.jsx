// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <Sidebar />
                <div className="content">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

// Composant Header
function Header() {
    return (
        <header className="header">
            <div className="search-container">
                <input type="text" placeholder="Rechercher..." className="search-input" />
            </div>
            <div className="header-right">
                <div className="notifications">
                    <span className="notification-icon">🔔</span>
                    <span className="notification-badge">3</span>
                </div>
                <div className="user-profile">
                    <img src="https://via.placeholder.com/36" alt="Profile" className="avatar" />
                    <span className="user-name">Jean Dupont</span>
                </div>
            </div>
        </header>
    );
}

// Composant Sidebar
function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="logo">
                <span>MonDashboard</span>
            </div>
            <nav className="nav">
                <ul>
                    <li className="nav-item active">
                        <Link to="/">
                            <span className="nav-icon">📊</span>
                            <span className="nav-text">Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/analytics">
                            <span className="nav-icon">📈</span>
                            <span className="nav-text">Analytiques</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/settings">
                            <span className="nav-icon">⚙️</span>
                            <span className="nav-text">Paramètres</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="sidebar-footer">
                <div className="user-info">
                    <img src="https://via.placeholder.com/36" alt="User" className="user-avatar" />
                    <div className="user-details">
                        <span className="user-name">Jean Dupont</span>
                        <span className="user-role">Administrateur</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

// Placeholder components
function Analytics() {
    return <div className="page-container"><h2>Page Analytiques</h2></div>;
}

function Settings() {
    return <div className="page-container"><h2>Page Paramètres</h2></div>;
}

export default App;