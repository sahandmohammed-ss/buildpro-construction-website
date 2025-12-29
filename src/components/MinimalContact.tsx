'use client';

import { useState } from 'react';
import { Mail, Check, Loader2 } from 'lucide-react';
import Button from './ui/Button';
import styles from './MinimalContact.module.css';

export default function MinimalContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', ...formData }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('idle');
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.left}>
            <h2 className={styles.heading}>
              <span className={styles.line}>LET&apos;S</span>
              <span className={styles.line}>BUILD</span>
              <span className={styles.line}>THE</span>
              <span className={styles.lineAccent}>FUTURE</span>
            </h2>
            
            <div className={styles.contactInfo}>
              <div className={styles.infoItem}>
                <span className={styles.label}>EMAIL</span>
                <a href="mailto:hello@buildpro.com" className={styles.link}>hello@buildpro.com</a>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>PHONE</span>
                <a href="tel:+15550000000" className={styles.link}>+1 (555) 000-0000</a>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>OFFICE</span>
                <p className={styles.text}>123 Innovation Blvd,<br/>New York, NY 10001</p>
              </div>
            </div>
          </div>

          <div className={styles.right}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder=" " 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    suppressHydrationWarning 
                  />
                  <label htmlFor="name">NAME</label>
                  <div className={styles.border} />
                </div>
                <div className={styles.field}>
                  <div className={styles.inputWrapper}>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder=" " 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                      suppressHydrationWarning 
                    />
                    <label htmlFor="email">EMAIL</label>
                    <Mail className={styles.icon} size={20} />
                  </div>
                  <div className={styles.border} />
                </div>
              </div>
              
              <div className={styles.field}>
                <input 
                  type="text" 
                  id="subject" 
                  placeholder=" " 
                  required 
                  value={formData.subject}
                  onChange={handleChange}
                  suppressHydrationWarning 
                />
                <label htmlFor="subject">SUBJECT</label>
                <div className={styles.border} />
              </div>

              <div className={styles.field}>
                <textarea 
                  id="message" 
                  rows={4} 
                  placeholder=" " 
                  required 
                  value={formData.message}
                  onChange={handleChange}
                  suppressHydrationWarning
                ></textarea>
                <label htmlFor="message">TELL US ABOUT YOUR PROJECT</label>
                <div className={styles.border} />
              </div>

              <Button 
                variant="primary" 
                className={styles.submit}
                disabled={status !== 'idle'}
              >
                {status === 'loading' ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Loader2 className={styles.spin} size={18} /> SENDING...
                  </span>
                ) : status === 'success' ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10B981' }}>
                    <Check size={18} /> MESSAGE SENT
                  </span>
                ) : (
                  'SEND MESSAGE'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
