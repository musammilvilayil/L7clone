import { useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, Moon, Plus, Sun, X } from 'lucide-react';
import { HERO_SLIDES } from './data/heroSlides';
import { CAPABILITIES } from './data/capabilitiesData';
import { PRODUCTS } from './data/productsData';
import { FAQS } from './data/faqData';
import { NetworkGesture } from './components/experience/NetworkGesture';

const NAV = [
  { label: 'Who we are', href: '#about' },
  { label: 'What we do', href: '#capabilities' },
  { label: 'What we think', href: '#products' },
  { label: 'Corporate Training', href: '#training' },
];
const AUDIENCES = [
  {
    title: 'For Established Brands & Scaling Businesses',
    description: 'We deliver robust, high-performance digital platforms with AI-powered personalisation, CRM integration, and analytics engineered for reliability, security, and global market reach across India, the Middle East, and Southeast Asia.',
  },
  {
    title: 'For Fast-Growing Startups & SMBs',
    description: 'We give ambitious businesses the same intelligent web systems, AI chatbots, and automated lead pipelines that larger organisations rely on so you convert more visitors, respond faster, and compete without limits.',
  },
];
const VALUE_PILLARS = [
  {
    title: 'Revenue-First, Always',
    description: "We do not build technology for technology's sake. Every platform, AI system, and integration we deliver is tied to a clear business outcome — more leads, lower acquisition costs, faster market entry, or higher conversion rates.",
  },
  {
    title: 'Global Delivery, Local Intelligence',
    description: 'We are an active delivery partner across India, UAE, Saudi Arabia, Singapore, the UK, and North America. Our work is informed by the specific cultural, linguistic, and compliance requirements of each market — not applied generically.',
  },
  {
    title: 'Security and Compliance Built In',
    description: "Every website, AI model, and data integration we build is privacy-first by design — aligned with GDPR, India's DPDP Act, UAE AI Policy, and Singapore's PDPA — so your business is protected in every market you operate.",
  },
];
const SOCIAL = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/company/ladder7-nextstep-solutions-llp' },
  { label: 'Instagram', url: 'https://www.instagram.com/ladder7_nextstep_solutions_?igsh=Mzd5cm5qbnpzam9p' },
  { label: 'Facebook', url: 'https://www.facebook.com/share/13wyxrXYTv/?mibextid=LQQJ4d' },
  { label: 'WhatsApp', url: "https://wa.me/918137979401?text=Hi%2C%20I'd%20like%20to%20know%20more%20about%20Ladder7." },
];

function Header({ light, setLight }: { light: boolean; setLight: (value: boolean) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);
  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a href="#top" className="brand-link" aria-label="Ladder7 homepage">
        <img src={light ? '/images/logos/logo-primary.webp' : '/images/logos/logo-white.webp'} alt="Ladder7" width="160" height="64" />
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {NAV.map(item => <a href={item.href} key={item.href}>{item.label}</a>)}
      </nav>
      <div className="header-actions">
        <div className="portal-links" aria-label="Ladder7 portals">
          <a href="#training">Education</a><a href="#top" aria-current="page">IT</a>
        </div>
        <button type="button" className="icon-button theme-button" onClick={() => setLight(!light)}
          aria-label={light ? 'Switch to dark theme' : 'Switch to light theme'}>
          {light ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <a className="header-contact" href="#contact">Let's talk <ArrowUpRight size={17} /></a>
        <button type="button" className="icon-button menu-button" aria-expanded={menuOpen}
          aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
      </div>
      <nav id="mobile-navigation" aria-label="Mobile navigation" className={`mobile-navigation ${menuOpen ? 'is-open' : ''}`}
        inert={!menuOpen}>
        {NAV.map(item => <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>{item.label} <ArrowUpRight size={19}/></a>)}
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact Us <ArrowUpRight size={19}/></a>
        <div className="mobile-portal"><a href="#training" onClick={() => setMenuOpen(false)}>Education</a><a href="#top" onClick={() => setMenuOpen(false)}>IT</a></div>
      </nav>
    </header>
  );
}

function Hero() {
  const slide = HERO_SLIDES[0];
  return (
    <section className="hero scene" id="top" aria-labelledby="hero-title">
      <div className="hero-content content-width">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> {slide.badge} / Ladder7 Nextstep Solutions</p>
          <div className="hero-heading-wrap">
            <span className="vertical-aside">ENGINEERING THE NEXT STEP</span>
            <h1 id="hero-title">{slide.title}<em>{slide.titleHighlight}</em></h1>
          </div>
        </div>
        <div className="hero-bottom hero-message">
          <p>{slide.description}</p>
          <div className="hero-actions">
            <a className="action action-primary" href="#contact">{slide.primaryCta}<ArrowUpRight size={19} /></a>
            <a className="action action-outline" href="#capabilities">{slide.secondaryCta}<ArrowRight size={19} /></a>
          </div>
        </div>
        <a className="scroll-cue hero-explore" href="#thinking"><ArrowDown size={16} /> Explore the experience</a>
        <div className="hero-art" aria-label="Ladder7 digital engineering imagery">
          <NetworkGesture gesture="hero"/>
          <figure className="hero-art-image">
            <img src={slide.image} alt="Ladder7 intelligent AI platform visual" fetchPriority="high" width="5583" height="3722" />
            <figcaption>INTELLIGENT AI / REAL-WORLD ENGINEERING</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Thinking() {
  return (
    <section className="scene thinking-section" id="thinking" aria-labelledby="thinking-title">
      <div className="content-width">
        <div className="section-intro split-intro">
          <NetworkGesture gesture="thinking" />
          <div>
            <p className="eyebrow"><span className="eyebrow-line"/> New perspectives</p>
            <h2 id="thinking-title">Complexity is real.<br/><span className="muted-title">The next step is clear.</span></h2>
          </div>
        </div>
        <div className="perspective-list">
          {HERO_SLIDES.slice(1).map((slide) => (
            <article key={slide.id} className="perspective">
              <div className="perspective-index">{slide.badge}</div>
              <div className="perspective-copy">
                <h3>{slide.title}<span>{slide.titleHighlight}</span></h3>
                <p>{slide.description}</p>
                <div className="inline-actions"><a href="#contact">{slide.primaryCta} <ArrowUpRight size={16}/></a>
                  <a href="#capabilities">{slide.secondaryCta} <ArrowRight size={16}/></a></div>
              </div>
              <div className="perspective-media"><img src={slide.image} alt={`${slide.badge} visual from Ladder7's original website`} loading="lazy" /></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="scene about-section" id="about" aria-labelledby="about-title">
      <div className="content-width">
        <p className="eyebrow"><span className="eyebrow-line" /> Who we are</p>
        <div className="about-lead">
          <NetworkGesture gesture="about" />
          <div className="about-copy">
            <h2 id="about-title">Every Business. Every Market. <em>One Goal — Revenue.</em></h2>
            <p>We build intelligent digital systems for organisations ready to turn their online presence into their most powerful sales asset. At Ladder7 Nextstep Solutions, we believe every business — regardless of size — deserves a digital presence that actively generates revenue. We act as the strategic delivery partner for growth-focused organisations, translating digital ambition into measurable business outcomes.</p>
          </div>
        </div>
        <div className="audience-list">
          {AUDIENCES.map((item, index) => (
            <article key={item.title} className="audience">
              <span className="audience-number">0{index + 1}</span>
              <div><h3>{item.title}</h3><p>{item.description}</p></div>
              <ArrowUpRight size={24} aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [active, setActive] = useState(0);
  const serviceGestures = ['digital', 'automation', 'strategy', 'development'] as const;
  return (
    <section className="scene services-section" id="capabilities" aria-labelledby="services-title">
      <div className="content-width">
        <div className="section-heading-row">
          <div><p className="eyebrow"><span className="eyebrow-line" /> What we do</p>
            <h2 id="services-title">Strategic<br/><em>Capabilities</em></h2>
            <p className="section-subtitle">Our four core pillars of excellence designed to future-proof your digital operations.</p></div>
          <a href="#contact" className="text-link">View Full Service Catalog <ArrowUpRight size={18}/></a>
        </div>
        <div className="services-layout">
          <div className="service-editorial">
          {CAPABILITIES.map((cap, index) => (
            <article className={`service-line ${active === index ? 'selected' : ''}`} key={cap.id}>
              <button type="button" aria-expanded={active === index} aria-controls={`service-panel-${cap.id}`}
                onClick={() => setActive(index)}>
                <span className="service-num">0{index + 1}</span>
                <span className="service-title">{cap.title}</span>
                <span className="service-icon">{active === index ? <ArrowUpRight size={25}/> : <Plus size={25}/>}</span>
              </button>
              <div className="service-body" id={`service-panel-${cap.id}`} hidden={active !== index}>
                <p>{cap.description}</p>
                <ul aria-label={`${cap.title} capabilities`}>{cap.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                <a href="#contact">Discuss this capability <ArrowRight size={17}/></a>
              </div>
            </article>
          ))}
          </div>
          <NetworkGesture gesture={serviceGestures[active]} className="services-art" />
        </div>
      </div>
    </section>
  );
}

function Products() {
  const [selected, setSelected] = useState(0);
  const product = PRODUCTS[selected];
  const change = (index: number) => setSelected((index + PRODUCTS.length) % PRODUCTS.length);
  return (
    <section className="scene products-section" id="products" aria-labelledby="products-title">
      <div className="content-width">
        <div className="section-intro">
          <p className="eyebrow"><span className="eyebrow-line"/> What we think / Our products</p>
          <h2 id="products-title">Intelligent Products for<br/><em>Every Corner of Your Business</em></h2>
          <p className="section-subtitle">From web performance and marketing analytics to sales, data, and operations, each product is designed to end in an action rather than a report.</p>
        </div>
        <div className="product-stage">
          <div className="product-index" role="tablist" aria-label="Explore Ladder7 products" aria-orientation="vertical">
            {PRODUCTS.map((item, index) => (
              <button key={item.id} type="button" id={`product-tab-${item.id}`}
                role="tab" aria-controls="product-panel" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1}
                onClick={() => change(index)}
                onKeyDown={event => {
                  if (event.key === 'ArrowDown' || event.key === 'ArrowRight') { event.preventDefault(); const next=(selected+1)%PRODUCTS.length; change(next); document.getElementById(`product-tab-${PRODUCTS[next].id}`)?.focus(); }
                  if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') { event.preventDefault(); const next=(selected-1+PRODUCTS.length)%PRODUCTS.length; change(next); document.getElementById(`product-tab-${PRODUCTS[next].id}`)?.focus(); }
                }}>
                <span>0{index + 1}</span><strong>{item.name}</strong><ArrowUpRight size={17} />
              </button>
            ))}
          </div>
          <div className="product-content" id="product-panel" role="tabpanel" aria-labelledby={`product-tab-${product.id}`} key={product.id}>
            <div className="product-visual">
              <img src={product.image} alt={`Original Ladder7 product showcase visual for ${product.name}`}
                width="740" height="580" loading="lazy"/>
              <span className="image-caption">LADDER7 / PRODUCT ECOSYSTEM</span>
              <NetworkGesture gesture="products" className="product-gesture" />
            </div>
            <div className="product-copy">
              <p className="eyebrow">Selected product / 0{selected + 1}</p>
              <h3>{product.name}</h3>
              <p className="product-tagline">{product.tagline}</p>
              <p>{product.description}</p>
              <ul className="feature-list">{product.features.map(feature => <li key={feature}><Check size={16}/>{feature}</li>)}</ul>
              <div className="inline-actions">
                <a href="#contact">{product.ctaPrimary} <ArrowUpRight size={17}/></a>
                <a href="#contact">Book a demo <ArrowRight size={17}/></a>
              </div>
              <div className="product-controls">
                <button type="button" onClick={() => change(selected - 1)} aria-label="Previous product"><ArrowLeft size={20}/></button>
                <span>0{selected + 1} <span>/ 0{PRODUCTS.length}</span></span>
                <button type="button" onClick={() => change(selected + 1)} aria-label="Next product"><ArrowRight size={20}/></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="scene why-section" id="why-ladder7" aria-labelledby="why-title">
      <div className="content-width">
        <p className="eyebrow"><span className="eyebrow-line"/> Why Ladder7</p>
        <div className="why-heading">
          <h2 id="why-title">Why Innovators<br/><em>Partner With Ladder7</em></h2>
          <div className="why-art">
            <NetworkGesture gesture="why" />
            <img src="/images/hero/hero-digital-engineering.png" alt="Digital engineering imagery from Ladder7" loading="lazy" width="5583" height="3722"/>
          </div>
        </div>
        <div className="values">
          {VALUE_PILLARS.map((pillar, i) => <article key={pillar.title}>
            <span>0{i + 1} — OUR APPROACH</span>
            <h3>{pillar.title}</h3><p>{pillar.description}</p>
          </article>)}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id ?? null);
  return (
    <section className="scene faq-section" id="faq" aria-labelledby="faq-title">
      <div className="content-width faq-grid">
        <div className="faq-intro">
          <p className="eyebrow"><span className="eyebrow-line"/> Your questions, answered</p>
          <h2 id="faq-title">Better questions.<br/><em>Clearer next steps.</em></h2>
          <NetworkGesture gesture="faq" />
          <p className="faq-visual-label">A connection begins with a question.</p>
        </div>
        <div className="faq-questions">
          {FAQS.map((item, index) => (
            <article className={`faq-entry ${openId === item.id ? 'open' : ''}`} key={item.id}>
              <h3><button id={`faq-button-${item.id}`} type="button" aria-expanded={openId === item.id}
                aria-controls={`faq-answer-${item.id}`}
                onClick={() => setOpenId(openId === item.id ? null : item.id)}>
                <span>0{index + 1}</span><strong>{item.question}</strong><ChevronDown size={22}/></button></h3>
              <div id={`faq-answer-${item.id}`} role="region" aria-labelledby={`faq-button-${item.id}`} hidden={openId !== item.id}>
                <p>{item.answer}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="scene contact-section" id="contact" aria-labelledby="contact-title">
      <div className="content-width">
        <p className="eyebrow"><span className="eyebrow-line"/> The final connection</p>
        <h2 id="contact-title">Your Website Should Be<br/><em>Generating Revenue Right Now.</em></h2>
        <NetworkGesture gesture="contact" />
        <p className="contact-description">Partner with Ladder7 to build an intelligent, connected, and scalable digital revenue system — engineered for your markets, your goals, and your growth.</p>
        <a className="action action-primary large-action" href="mailto:info@ladder7.in?subject=Start%20Your%20Revenue%20Engine">Start Your Revenue Engine Today <ArrowUpRight size={22}/></a>
        <div className="contact-details">
          <a href="mailto:info@ladder7.in">info@ladder7.in <ArrowUpRight size={17}/></a>
          <a href="tel:+918137979401">+91 8137979401 <ArrowUpRight size={17}/></a>
        </div>
      </div>
    </section>
  );
}

function Footer({ light }: { light: boolean }) {
  return (
    <footer className="site-footer" id="footer">
      <div className="content-width">
        <div className="footer-top">
          <img src={light ? '/images/logos/logo-primary.webp' : '/images/logos/logo-white.webp'}
            alt="Ladder7 Nextstep Solutions" width="200" height="80" loading="lazy"/>
          <p>Technology connects people.<br/>Let's build what's next.</p>
          <a href="#top" className="back-to-top">Back to top <ArrowUpRight size={17}/></a>
        </div>
        <div className="footer-columns">
          <div><h3>Services</h3>
            <a href="#capabilities">Digital Experience & Web Engineering</a>
            <a href="#capabilities">AI & Intelligent Automation</a>
            <a href="#capabilities">Strategy & Technology Consulting</a>
          </div>
          <div><h3>Company</h3>
            <a href="#products">Our Products</a><a href="#about">Blogs</a><a href="#about">Careers</a>
            <a href="#training">Bootcamp</a><a href="#capabilities">Portfolio</a><a href="#contact">Contact Form</a>
          </div>
          <div><h3>Our Locations</h3>
            <strong>Cochin</strong><span>WEE SPACES Ernakulam</span>
            <strong>Trivandrum</strong><span>Kinfra Film and IT Park Trivandrum</span>
          </div>
          <div><h3>Contact Us</h3>
            <a href="tel:+918137979401">+91 8137979401</a>
            <a href="mailto:info@ladder7.in">info@ladder7.in</a>
            <h3 className="follow-heading">Follow us</h3>
            <div className="social-links">{SOCIAL.map(link => <a key={link.label} href={link.url}
              target="_blank" rel="noopener noreferrer" aria-label={`Ladder7 on ${link.label}`}>{link.label}<ArrowUpRight size={14}/></a>)}</div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Ladder7 NextStep Solutions. All rights reserved.</p>
          <a href="#contact">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [light, setLight] = useState(() => {
    try { return localStorage.getItem('theme') === 'light'; } catch { return false; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = light ? 'light' : 'dark';
    try { localStorage.setItem('theme', light ? 'light' : 'dark'); } catch { /* Storage optional */ }
  }, [light]);
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header light={light} setLight={setLight}/>
      <main id="main-content">
        <Hero />
        <Thinking />
        <About />
        <Services />
        <Products />
        <Why />
        <FAQ />
        <Contact />
        <section className="training-strip" id="training">
          <div className="content-width"><div><span className="eyebrow">Ladder7 / Education</span>
            <h2>Corporate Training</h2></div><a href="mailto:info@ladder7.in?subject=Corporate%20Training">Contact Us <ArrowUpRight size={18}/></a></div>
        </section>
      </main>
      <Footer light={light}/>
    </>
  );
}
