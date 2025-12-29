'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import styles from './project.module.css';
import PageTransition from '@/components/PageTransition';

const allProjects = [
  {
    id: 1,
    title: "Obsidian Tower",
    category: "Commercial",
    image: "/images/architecture-landscape.jpg",
    location: "New York, NY",
    year: "2024",
    client: "Obsidian Group",
    challenge: "Designing a sustainable skyscraper in a dense urban environment.",
    solution: "Integrated vertical gardens and solar glass technology.",
    concept: "The Obsidian Tower represents a paradigm shift in urban verticality. Inspired by the monolithic presence of volcanic glass, the structure rises as a singular, dark entity that absorbs and reflects the city's energy. The design philosophy centers on 'biophilic integration within a high-density envelope', proving that nature and skyscrapers can coexist symbiotically.",
    specs: {
      area: "120,000 sqm",
      height: "350m",
      floors: "88",
      sustainability: "LEED Platinum"
    },
    gallery: ["/images/architecture-landscape.jpg", "/images/luxury-house-9-1.jpg", "/images/exterior-of-the-building-1.jpg"],
    quote: "BuildPro transformed our skyline vision into a sustainable reality that exceeds every expectation.",
    quoteAuthor: "James Sterling, CEO Obsidian Group"
  },
  {
    id: 2,
    title: "Bronze Residence",
    category: "Residential",
    image: "/images/luxury-house-9-1.jpg",
    location: "Los Angeles, CA",
    year: "2023",
    client: "Private",
    challenge: "Creating privacy while maximizing ocean views.",
    solution: "Cantilevered levels and smart glass opacity control.",
    concept: "A study in warmth and modernity, the Bronze Residence uses materials that will patina over time, allowing the house to age gracefully with its landscape. The cantilevered volumes create shaded outdoor living spaces essential for the California climate, blurring the line between indoor luxury and the rugged coastline.",
    specs: {
      area: "1,200 sqm",
      height: "3 Levels",
      floors: "3",
      sustainability: "Net Zero Ready"
    },
    gallery: ["/images/luxury-house-9-1.jpg", "/images/architecture-landscape.jpg", "/images/051Edited-no-address-1200x790.jpg"],
    quote: "A masterpiece of modern living that feels both expansive and intimately private.",
    quoteAuthor: "Homeowner"
  },
  {
    id: 3,
    title: "Void Bridge",
    category: "Infrastructure",
    image: "/images/exterior-of-the-building-1.jpg",
    location: "London, UK",
    year: "2025",
    client: "City of London",
    challenge: "Spanning the Thames with minimal environmental impact.",
    solution: "Suspension design using recycled steel composites.",
    concept: "The Void Bridge challenges traditional heavy infrastructure by utilizing negative space. Its structural integrity is derived from tension rather than compression, resulting in a silhouette that appears to float. It serves not just as a crossing, but as a viewing platform for the city's historic riverfront.",
    specs: {
      area: "Length: 450m",
      height: "Pylons: 60m",
      floors: "N/A",
      sustainability: "100% Recycled Steel"
    },
    gallery: ["/images/exterior-of-the-building-1.jpg", "/images/rosie-steggles-vCa97LyZgOg-unsplash.jpg", "/images/carbon_hq_background.png"],
    quote: "An engineering marvel that respects the river's history while looking boldly to the future.",
    quoteAuthor: "Mayor of London"
  },
  {
    id: 4,
    title: "Azure Marina",
    category: "Marine",
    image: "/images/051Edited-no-address-1200x790.jpg",
    location: "Dubai, UAE",
    year: "2024",
    client: "Azure Resorts",
    challenge: "Building a luxury marina that withstands extreme heat.",
    solution: "Advanced cooling systems and heat-reflective materials.",
    concept: "Designed to mimic the fluidity of water, the Azure Marina features organic curves and reflective surfaces that minimize heat absorption. The entire complex is a self-sustaining ecosystem, utilizing seawater cooling and solar power to maintain a comfortable microclimate for visitors and vessels alike.",
    specs: {
      area: "50,000 sqm",
      height: "Low-rise",
      floors: "2",
      sustainability: "Solar Powered"
    },
    gallery: ["/images/051Edited-no-address-1200x790.jpg", "/images/luxury-house-9-1.jpg", "/images/architecture-landscape.jpg"],
    quote: "The coolest place in Dubai, literally and figuratively. A true oasis.",
    quoteAuthor: "Director, Azure Resorts"
  },
  {
    id: 5,
    title: "Carbon Hub",
    category: "Industrial",
    image: "/images/rosie-steggles-vCa97LyZgOg-unsplash.jpg",
    location: "Berlin, DE",
    year: "2023",
    client: "GreenEnergy Corp",
    challenge: "Repurposing an old factory into a net-zero office.",
    solution: "Adaptive reuse with geothermal energy integration.",
    concept: "The Carbon Hub celebrates its industrial past while embracing a green future. We preserved the original brick shell but inserted a high-tech, timber-framed core. This 'building within a building' approach dramatically improves thermal efficiency while maintaining the site's historical character.",
    specs: {
      area: "15,000 sqm",
      height: "5 Levels",
      floors: "5",
      sustainability: "Carbon Negative"
    },
    gallery: ["/images/rosie-steggles-vCa97LyZgOg-unsplash.jpg", "/images/carbon_hq_background.png", "/images/exterior-of-the-building-1.jpg"],
    quote: "Proof that industrial heritage and sustainable future can coexist beautifully.",
    quoteAuthor: "GreenEnergy Corp CEO"
  },
  {
    id: 6,
    title: "Zenith Spire",
    category: "Commercial",
    image: "/images/daniel-chen-cNaEqXSsZ0k-unsplash.jpg",
    location: "Tokyo, JP",
    year: "2025",
    client: "Zenith Holdings",
    challenge: "Maximizing floor space on a narrow plot.",
    solution: "Spiral structural core design.",
    concept: "In the dense fabric of Tokyo, the Zenith Spire twists upwards to capture light and views. The spiral geometry is not just aesthetic; it reduces wind loads and creates a series of sky gardens that provide green respite at every level, redefining the vertical office experience.",
    specs: {
      area: "80,000 sqm",
      height: "280m",
      floors: "65",
      sustainability: "CASBEE S Rank"
    },
    gallery: ["/images/carbon_hq_background.png", "/images/architecture-landscape.jpg", "/images/luxury-house-9-1.jpg"],
    quote: "A vertical masterpiece that defines the new Tokyo skyline.",
    quoteAuthor: "Zenith Holdings Chairman"
  }
];



import Image from 'next/image';

// ... (imports)

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const project = allProjects.find(p => p.id === Number(params.id));
  
  // Parallax Effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

  if (!project) {
    return <div className={styles.main}>Project not found</div>;
  }

  // Calculate next project
  const nextProjectId = (project.id % allProjects.length) + 1;
  const nextProject = allProjects.find(p => p.id === nextProjectId);

  return (
    <PageTransition>
      <main className={styles.main}>
        <div className={styles.navWrapper}>
          <FloatingNav />
          <button 
            onClick={() => router.push('/projects')}
            className={styles.backButton}
          >
            ← Back to Projects
          </button>
        </div>

        {/* Parallax Hero */}
        <div className={styles.heroSection}>
          <motion.div 
            style={{ y }} 
            className={styles.heroImageWrapper}
          >
            <Image 
              src={project.image} 
              alt={project.title} 
              fill
              priority
              className={styles.heroImage}
              sizes="100vw"
            />
          </motion.div>
          <div className={styles.heroContent}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className={styles.title}>{project.title}</h1>
              <span className={styles.category}>{project.category}</span>
            </motion.div>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.contentGrid}>
            {/* Sidebar - Sticky Specs */}
            <aside className={styles.sidebar}>
              <div className={styles.specsList}>
                <div className={styles.specItem}>
                  <h4>Area</h4>
                  <p>{project.specs?.area}</p>
                </div>
                <div className={styles.specItem}>
                  <h4>Height</h4>
                  <p>{project.specs?.height}</p>
                </div>
                <div className={styles.specItem}>
                  <h4>Floors</h4>
                  <p>{project.specs?.floors}</p>
                </div>
                <div className={styles.specItem}>
                  <h4>Sustainability</h4>
                  <p>{project.specs?.sustainability}</p>
                </div>
              </div>
            </aside>

            {/* Main Content - Story, Quote, Gallery */}
            <div className={styles.mainContent}>
              {/* Concept & Story */}
              <div className={styles.storySection}>
                <h3 className={styles.sectionTitle}>The Concept</h3>
                <p className={styles.conceptText}>{project.concept}</p>
                
                <h3 className={styles.sectionTitle} style={{marginTop: '4rem'}}>The Challenge</h3>
                <p className={styles.text}>{project.challenge}</p>
                
                <h3 className={styles.sectionTitle} style={{marginTop: '4rem'}}>The Solution</h3>
                <p className={styles.text}>{project.solution}</p>
              </div>

              {/* Quote Section */}
              {project.quote && (
                <div className={styles.quoteSection}>
                  <blockquote className={styles.quote}>&quot;{project.quote}&quot;</blockquote>
                  <cite className={styles.quoteAuthor}>— {project.quoteAuthor}</cite>
                </div>
              )}

              {/* Gallery Section */}
              {project.gallery && (
                <div className={styles.gallerySection}>
                  <h3 className={styles.sectionTitle} style={{marginBottom: '2rem'}}>Project Gallery</h3>
                  <div className={styles.galleryGrid}>
                    {project.gallery.map((img, idx) => (
                      <div key={idx} className={styles.galleryItem}>
                        <Image 
                          src={img} 
                          alt={`${project.title} view ${idx + 1}`} 
                          fill
                          className={styles.galleryImage}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Projects Section */}
        <div className={styles.relatedProjectsSection}>
          <div className={styles.relatedContainer}>
            <h3 className={styles.relatedTitle}>Selected Works</h3>
            <div className={styles.relatedGrid}>
              {[
                allProjects[(project.id) % allProjects.length], 
                allProjects[(project.id + 1) % allProjects.length]
              ].map((related) => (
                <div 
                  key={related.id}
                  className={styles.relatedCard}
                  onClick={() => router.push(`/projects/${related.id}`)}
                >
                  <div className={styles.relatedImageWrapper}>
                    <Image 
                      src={related.image} 
                      alt={related.title} 
                      fill
                      className={styles.relatedImage}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className={styles.relatedOverlay} />
                  </div>
                  <div className={styles.relatedContent}>
                    <span className={styles.relatedCategory}>{related.category}</span>
                    <h4 className={styles.relatedProjectTitle}>{related.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </PageTransition>
  );
}
