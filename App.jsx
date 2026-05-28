import React, { useState, useEffect } from 'react';
import UploadForm from './components/UploadForm';
import AdminDashboard from './components/AdminDashboard';
import './index.css';

function App() {
  const [view, setView] = useState('customer'); // 'customer' or 'admin'
  const [adminUnlocked, setAdminUnlocked] = useState(false); // Hidden by default for security

  // Secure keyboard shortcut listener (Ctrl + Shift + A) to unlock Admin Dashboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for Ctrl + Shift + A
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        const pw = prompt('Enter Admin Operations Password:');
        if (pw === 'SATISH@146780') {
          setAdminUnlocked(true);
          setView('admin');
          alert('🔑 Admin Operations Dashboard unlocked and visible!');
        } else if (pw !== null) {
          alert('❌ Access Denied: Incorrect password.');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div id="root">
      {/* Premium Luxury Header */}
      <header className="app-header">
        <a href="/" className="brand-logo">
          LAUNCH MY CLOTHING BRAND
          <span>Pattern &amp; Design Portal</span>
        </a>

        <div className="nav-tabs">
          <button 
            className={`tab-btn ${view === 'customer' ? 'active' : ''}`}
            onClick={() => setView('customer')}
          >
            Submit Design
          </button>
          
          {/* Admin tab is only visible once unlocked via Ctrl+Shift+A */}
          {adminUnlocked && (
            <button 
              className={`tab-btn ${view === 'admin' ? 'active' : ''}`}
              onClick={() => setView('admin')}
              style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}
            >
              Operations (Admin)
            </button>
          )}
        </div>
      </header>

      {/* Primary Display Portal */}
      <main style={{ flex: 1 }}>
        {view === 'customer' ? (
          <div className="fade-in">
            <UploadForm />
          </div>
        ) : (
          <div className="fade-in glass-card-wide">
            {adminUnlocked ? (
              <AdminDashboard />
            ) : (
              <div className="glass-card text-center" style={{ padding: '4rem 2rem' }}>
                <h3>🔒 Access Protected</h3>
                <p style={{ opacity: 0.6, fontSize: '0.85rem', marginTop: '1rem' }}>
                  Press <strong>Ctrl + Shift + A</strong> on your keyboard and enter your admin password to view submissions.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Sleek Minimal Footer */}
      <footer style={{
        padding: '2.5rem 0',
        borderTop: '1px solid rgba(200, 169, 81, 0.1)',
        textAlign: 'center',
        opacity: 0.4,
        fontSize: '0.68rem',
        letterSpacing: '0.12em',
        fontFamily: "'DM Mono', monospace",
        textTransform: 'uppercase',
        marginTop: '2rem'
      }}>
        © {new Date().getFullYear()} Launch My Clothing Brand. All rights reserved. Sizing calculations verified by expert pattern makers.
      </footer>
    </div>
  );
}

export default App;
