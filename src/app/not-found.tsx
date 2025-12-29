import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: 'var(--bg-void)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      color: 'var(--text-primary)',
    }}>
      {/* Background Noise */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Content */}
      <div style={{ zIndex: 1, textAlign: 'center', padding: '2rem' }}>
        <h1 style={{
          fontSize: '15vw',
          lineHeight: 0.8,
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          background: 'linear-gradient(to bottom, #fff 0%, #666 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem',
        }}>
          404
        </h1>
        
        <h2 style={{
          fontSize: '2rem',
          fontFamily: 'var(--font-display)',
          color: 'var(--accent-bronze)',
          letterSpacing: '0.1em',
          marginBottom: '2rem',
          textTransform: 'uppercase',
        }}>
          Page Not Found
        </h2>
        
        <p style={{
          color: 'var(--text-secondary)',
          maxWidth: '400px',
          margin: '0 auto 3rem',
          lineHeight: 1.6,
        }}>
          The page you are looking for has been moved, deleted, or possibly never existed.
        </p>

        <Link 
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem 2rem',
            backgroundColor: 'var(--accent-bronze)',
            color: '#000',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            transition: 'transform 0.3s ease',
          }}
        >
          <ArrowLeft size={20} />
          Return Home
        </Link>
      </div>
    </main>
  );
}
