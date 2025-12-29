import FloatingNav from '@/components/FloatingNav';
import CinematicHero from '@/components/CinematicHero';
import Marquee from '@/components/Marquee';
import ViewProjects from '@/components/ViewProjects';
import ServiceAccordion from '@/components/ServiceAccordion';
import About from '@/components/About';
import Team from '@/components/Team';
import Testimonials from '@/components/Testimonials';
import MinimalContact from '@/components/MinimalContact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main style={{ position: 'relative' }}>
      <div style={{ position: 'relative', zIndex: 100 }}>
        <FloatingNav />
      </div>
      <CinematicHero />
      <Marquee />
      <ViewProjects />
      <ServiceAccordion />
      <About />
      <Team />
      <Testimonials />
      <MinimalContact />
      <Footer />
    </main>
  );
}
