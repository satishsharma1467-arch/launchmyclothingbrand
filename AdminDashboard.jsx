import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Loader from './Loader';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'paid', 'pending'
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch submissions from Supabase 'messages' table matching photo-to-pattern requests
  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .like('subject', '%Photo-to-Pattern%')
        .order('received_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (e) {
      console.error("Error loading submissions:", e);
      alert("Failed to load submissions from Supabase: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const formatPhoneForWA = (phoneStr) => {
    // Strip non-numeric characters for perfect wa.me API format
    return phoneStr.replace(/[^0-9]/g, '');
  };

  // Helper to extract image URL from the serialized specs text block
  const extractImageUrl = (messageText) => {
    if (!messageText) return '';
    const match = messageText.match(/Design Reference Image:\s*(https?:\/\/\S+)/i);
    return match ? match[1] : '';
  };

  // Helper to extract clean specs description text for high-fidelity viewing
  const cleanSpecsMessage = (messageText) => {
    if (!messageText) return '';
    // Find where specs description starts
    const startIdx = messageText.indexOf('=== PHOTO-TO-PATTERN SPECIFICATION SHEET REQUEST ===');
    if (startIdx !== -1) {
      return messageText.substring(startIdx);
    }
    return messageText;
  };

  const getStatusBadge = (messageText) => {
    const isPaid = messageText && messageText.includes('Payment Reference ID:');
    return (
      <span style={{
        fontSize: '0.62rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        padding: '3px 10px',
        borderRadius: '20px',
        display: 'inline-block',
        border: '1px solid',
        background: isPaid ? 'rgba(76, 175, 80, 0.08)' : 'rgba(212, 71, 42, 0.08)',
        borderColor: isPaid ? '#4CAF50' : '#D4472A',
        color: isPaid ? '#4CAF50' : '#D4472A'
      }}>
        {isPaid ? '✓ Paid' : '⏳ Pending'}
      </span>
    );
  };

  const filteredSubmissions = submissions
    .filter(sub => {
      const isPaid = sub.message && sub.message.includes('Payment Reference ID:');
      if (filter === 'all') return true;
      if (filter === 'paid') return isPaid;
      if (filter === 'pending') return !isPaid;
      return true;
    })
    .filter(sub => {
      const term = searchTerm.toLowerCase();
      return (
        sub.name.toLowerCase().includes(term) ||
        sub.phone.toLowerCase().includes(term) ||
        (sub.message && sub.message.toLowerCase().includes(term))
      );
    });

  if (loading) {
    return (
      <div className="card-panel glass-card" style={{ padding: '4rem 2rem' }}>
        <Loader message="Fetching submissions from Supabase..." />
      </div>
    );
  }

  return (
    <div className="card-panel glass-card fade-in">
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(200, 169, 81, 0.15)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <div>
          <div className="premium-badge">Internal Operations</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 300 }}>Sizing Design <em style={{ fontStyle: 'italic', color: '#C8A951' }}>Orders</em></h2>
        </div>
        <button onClick={fetchSubmissions} className="btn-submit" style={{ width: 'auto', padding: '0.6rem 1.4rem', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
          🔄 Refresh DB
        </button>
      </div>

      {/* Control bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.8rem' }}>
        
        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'paid', 'pending'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? 'rgba(200, 169, 81, 0.12)' : 'transparent',
                borderColor: filter === f ? '#C8A951' : 'rgba(200, 169, 81, 0.15)',
                color: filter === f ? '#C8A951' : '#F5F0E8',
                borderWidth: '1px',
                borderStyle: 'solid',
                padding: '0.45rem 1.1rem',
                fontSize: '0.72rem',
                fontFamily: 'inherit',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                opacity: filter === f ? 1 : 0.6,
                textTransform: 'uppercase',
                transition: 'all 0.2s'
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search */}
        <input 
          type="text" 
          placeholder="Search name, phone, categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(200, 169, 81, 0.2)',
            color: '#F5F0E8',
            padding: '0.5rem 1rem',
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.8rem',
            outline: 'none',
            maxWidth: '300px',
            width: '100%'
          }}
        />
      </div>

      {/* Submissions List */}
      {filteredSubmissions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '1px dashed rgba(200,169,81,0.15)', opacity: 0.5 }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>📭</div>
          <p style={{ fontSize: '0.85rem' }}>No style design submissions found matching the criteria.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filteredSubmissions.map((sub, idx) => {
            const imageUrl = extractImageUrl(sub.message);
            const specs = cleanSpecsMessage(sub.message);
            
            return (
              <div 
                key={sub.id || idx}
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(200, 169, 81, 0.12)',
                  padding: '1.8rem',
                  display: 'grid',
                  gridTemplateColumns: '130px 1fr',
                  gap: '1.8rem',
                  alignItems: 'start',
                  position: 'relative'
                }}
                className="order-card-hover"
              >
                {/* Order number */}
                <div style={{
                  position: 'absolute',
                  top: '1.2rem',
                  right: '1.5rem',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '0.9rem',
                  color: '#C8A951',
                  opacity: 0.45,
                  background: 'rgba(200, 169, 81, 0.06)',
                  padding: '2px 8px',
                  border: '1px solid rgba(200,169,81,0.15)'
                }}>
                  SUBMISSION #{filteredSubmissions.length - idx}
                </div>

                {/* Design Image Thumbnail */}
                <div style={{ 
                  aspectRatio: '3/4', 
                  background: '#0E0B06', 
                  border: '1px solid rgba(200, 169, 81, 0.15)',
                  overflow: 'hidden'
                }}>
                  {imageUrl ? (
                    <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                      <img 
                        src={imageUrl} 
                        alt="Customer Garment Design" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.08)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                      />
                    </a>
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🖼</div>
                  )}
                </div>

                {/* Technical Specifications details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 300 }}>{sub.name}</h3>
                    {getStatusBadge(sub.message)}
                  </div>

                  <div style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '-0.3rem' }}>
                    <span>📱 Phone: <strong>{sub.phone}</strong></span>
                    <span style={{ margin: '0 1rem' }}>•</span>
                    <span>🗓 Date: <strong>{new Date(sub.received_at).toLocaleString('en-IN')}</strong></span>
                  </div>

                  {specs && (
                    <pre style={{
                      background: 'rgba(255,255,255,0.02)',
                      borderLeft: '2px solid #C8A951',
                      padding: '1rem',
                      fontSize: '0.78rem',
                      lineHeight: 1.6,
                      color: '#F5F0E8',
                      opacity: 0.9,
                      fontFamily: "'DM Mono', monospace",
                      whiteSpace: 'pre-wrap',
                      overflowX: 'auto',
                      margin: '0.5rem 0'
                    }}>
                      {specs}
                    </pre>
                  )}

                  <div style={{ marginTop: '0.5rem' }}>
                    <a 
                      href={`https://wa.me/${formatPhoneForWA(sub.phone)}?text=${encodeURIComponent('Hi, I received your design. Working on it.')}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        background: 'transparent',
                        border: '1px solid #4CAF50',
                        color: '#4CAF50',
                        padding: '0.6rem 1.4rem',
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '0.72rem',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.25s'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(76, 175, 80, 0.08)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'none'; }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#4CAF50"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Reply on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
