'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'newsletter', email }),
      });

      if (!response.ok) throw new Error('Subscription failed');

      setStatus('success');
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error) {
      console.error(error);
      setStatus('idle'); // Or add an error state
      alert('Failed to subscribe. Please try again.');
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Massive Brand Header */}
        <div className={styles.brandHeader}>
          <h1 className={styles.bigLogo}>BUILDPRO</h1>
        </div>

        <div className={styles.grid}>
          {/* Column 1: Navigation */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>SITEMAP</h3>
            <nav className={styles.nav}>
              <Link href="/" className={styles.link}>Home</Link>
              <Link href="#projects" className={styles.link}>Projects</Link>
              <Link href="#services" className={styles.link}>Services</Link>
              <Link href="#carbon-hq" className={styles.link}>Carbon HQ</Link>
              <Link href="#contact" className={styles.link}>Contact</Link>
            </nav>
          </div>

          {/* Column 2: Socials */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>SOCIAL</h3>
            <nav className={styles.nav}>
              <a href="#" className={styles.link}>Instagram</a>
              <a href="#" className={styles.link}>LinkedIn</a>
              <a href="#" className={styles.link}>Twitter / X</a>
              <a href="#" className={styles.link}>Behance</a>
            </nav>
          </div>

          {/* Column 3: Legal */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>LEGAL</h3>
            <nav className={styles.nav}>
              <a href="#" className={styles.link}>Privacy Policy</a>
              <a href="#" className={styles.link}>Terms of Service</a>
              <a href="#" className={styles.link}>Cookie Settings</a>
            </nav>
          </div>

          {/* Column 4: Newsletter / Action */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>STAY UPDATED</h3>
            <p className={styles.text}>
              Subscribe to our newsletter for the latest architectural insights.
            </p>
            <form className={styles.newsletter} onSubmit={handleSubmit}>
              <input 
                type="email" 
                placeholder={status === 'success' ? 'Subscribed!' : 'Email Address'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                disabled={status !== 'idle'}
                suppressHydrationWarning 
              />
              <button 
                type="submit" 
                aria-label="Subscribe"
                disabled={status !== 'idle'}
                style={{ opacity: status === 'idle' ? 1 : 0.7 }}
              >
                {status === 'loading' ? (
                  <Loader2 size={20} className={styles.spin} />
                ) : status === 'success' ? (
                  <Check size={20} color="#10B981" />
                ) : (
                  <ArrowRight size={20} />
                )}
              </button>
            </form>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            &copy; 2024 BUILDPRO CONSTRUCTION. ALL RIGHTS RESERVED.
          </div>
          <div className={styles.credit}>
            DESIGNED FOR THE BOLD.
          </div>
        </div>
      </div>
    </footer>
  );
}
