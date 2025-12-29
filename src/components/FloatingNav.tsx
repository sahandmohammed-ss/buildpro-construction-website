'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import styles from './FloatingNav.module.css';
import Button from './ui/Button';

const navLinks = [
  { name: 'Home', href: '/#' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Services', href: '/#services' },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
];

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If we are on the home page and it's a hash link, scroll smoothly
    if (pathname === '/' && href.startsWith('/#')) {
      e.preventDefault();
      setIsOpen(false);
      
      const hash = href.replace('/', ''); // Remove the leading slash to get '#section'
      
      if (hash === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.querySelector(hash);
        if (element) {
          // Offset for fixed navbar
          const offset = 100; 
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    } else {
      // Otherwise, let Next.js Link handle the navigation
      setIsOpen(false);
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          BUILD<span className={styles.logoAccent}>PRO</span>
        </Link>

        {/* Desktop Links */}
        <div className={styles.links}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={styles.link}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className={styles.actions}>
          <Link href="/#contact" onClick={(e) => handleClick(e, '/#contact')}>
            <Button variant="primary">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.menuToggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={styles.mobileLink}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/#contact" onClick={(e) => handleClick(e, '/#contact')}>
            <Button variant="primary" className={styles.mobileBtn}>
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
