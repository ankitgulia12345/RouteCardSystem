import React, { useEffect, useState } from 'react'

const Loader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setFadeOut(true)
            setTimeout(() => onFinish?.(), 600)
          }, 300)
          return 100
        }
        return prev + Math.random() * 12
      })
    }, 120)
    return () => clearInterval(interval)
  }, [onFinish])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#0a0a0a',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
      opacity: fadeOut ? 0 : 1,
      transform: fadeOut ? 'scale(1.04)' : 'scale(1)',
      pointerEvents: fadeOut ? 'none' : 'all',
      fontFamily: "'Courier New', monospace",
    }}>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(99,200,255,0.08) 0%, transparent 70%)',
        borderRadius: '50%', animation: 'pulse 3s ease-in-out infinite',
      }} />

      {/* Logo / Brand mark */}
      <div style={{ position: 'relative', marginBottom: 48 }}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" stroke="rgba(99,200,255,0.2)" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="20" stroke="rgba(99,200,255,0.4)" strokeWidth="1"
            strokeDasharray="4 4"
            style={{ animation: 'spin 8s linear infinite', transformOrigin: '32px 32px' }} />
          <circle cx="32" cy="32" r="4" fill="#63c8ff" />
          <line x1="32" y1="12" x2="32" y2="22" stroke="#63c8ff" strokeWidth="1.5" strokeLinecap="round"
            style={{ animation: 'spin 2s linear infinite', transformOrigin: '32px 32px' }} />
          <line x1="32" y1="8" x2="32" y2="18" stroke="rgba(99,200,255,0.4)" strokeWidth="1"
            style={{ animation: 'spin 6s linear infinite reverse', transformOrigin: '32px 32px' }} />
        </svg>
      </div>

      {/* Progress bar */}
      <div style={{ width: 220, marginBottom: 18 }}>
        <div style={{
          width: '100%', height: 1,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 4, overflow: 'hidden',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, height: '100%',
            width: `${Math.min(progress, 100)}%`,
            background: 'linear-gradient(90deg, #63c8ff, #a78bfa)',
            borderRadius: 4,
            transition: 'width 0.15s ease',
            boxShadow: '0 0 12px rgba(99,200,255,0.6)',
          }} />
        </div>
      </div>

      {/* Percentage + label */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
        <span style={{
          fontSize: 36, fontWeight: 700, color: '#fff',
          letterSpacing: '-0.02em', lineHeight: 1,
        }}>
          {Math.min(Math.floor(progress), 100)}
        </span>
        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>%</span>
      </div>

      <p style={{
        fontSize: 11, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.25)',
        textTransform: 'uppercase', margin: 0,
        animation: 'blink 1.4s step-start infinite',
      }}>
        Initializing
      </p>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.1); }
        }
        @keyframes blink {
          0%, 100% { opacity: 0.25; }
          50%       { opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}

export default Loader