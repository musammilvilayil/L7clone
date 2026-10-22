import { useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, Moon, Plus, Sun, X } from 'lucide-react';
import { HERO_SLIDES } from './data/heroSlides';
import { CAPABILITIES } from './data/capabilitiesData';
import { PRODUCTS } from './data/productsData';
import { FAQS } from './data/faqData';
import { NetworkGesture } from './components/experience/NetworkGesture';
import { CHAPTERS, useScrollDirector } from './components/experience/useScrollDirector';

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
    description: "Every website, AI model, and data integration we build is privacy-first by design — aligned with GDPR, India's DPDP Act, UAE AI Policy, and Singapore's PDPA — so your business is protected in every market we operate.",
  },
];

const SOCIAL = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/company/ladder7-nextstep-solutions-llp' },
  { label: 'Instagram', url: 'https://www.instagram.com/ladder7_nextstep_solutions_?igsh=Mzd5cm5qbnpzam9p' },
  { label: 'Facebook', url: 'https://www.facebook.com/share/13wyxrXYTv/?mibextid=LQQJ4d' },
  { label: 'WhatsApp', url: "https://wa.me/918137979401?text=Hi%2C%20I'd%20like%20to%20know%20more%20about%20Ladder7." },
];

function ChapterLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <p className="cin-kicker"><span>{number}</span><i aria-hidden="true" />{children}</p>;
}

function Header({ light, setLight }: { light: boolean; setLight: (value: boolean) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);

  return <header className={'cin-header' + (scrolled ? ' is-scrolled' : '')}>
    <a href="#top" className="cin-logo" aria-label="Ladder7 homepage" onClick={() => setMenuOpen(false)}>
      <img src={light ? '/images/logos/logo-primary.webp' : '/images/logos/logo-white.webp'} alt="Ladder7" width="180" height="72"/>
    </a>
    <nav className="cin-primary-nav" aria-label="Primary navigation">
      {NAV.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
    </nav>
    <div className="cin-header-tools">
      <div className="cin-portals"><a href="#training">Education</a><a href="#top" aria-current="page">IT</a></div>
      <button className="cin-icon-button" type="button" aria-label={light ? 'Switch to dark theme' : 'Switch to light theme'} onClick={() => setLight(!light)}>
        {light ? <Moon size={19}/> : <Sun size={19}/>}
      </button>
      <a href="#contact" className="cin-contact-link">Let's talk <ArrowUpRight size={17}/></a>
      <button className="cin-icon-button cin-menu-button" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-controls="mobile-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={24}/> : <Menu size={24}/>}
      </button>
    </div>
    <nav id="mobile-navigation" className={'cin-mobile-nav' + (menuOpen ? ' is-open' : '')} aria-label="Mobile navigation" inert={!menuOpen}>
      {NAV.map((item, index) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}><span>0{index+1}</span>{item.label}<ArrowUpRight size={20}/></a>)}
      <a href="#contact" onClick={() => setMenuOpen(false)}><span>05</span>Contact Us<ArrowUpRight size={20}/></a>
      <div className="cin-mobile-portals"><a href="#training" onClick={() => setMenuOpen(false)}>Education</a><a href="#top" onClick={() => setMenuOpen(false)}>IT</a></div>
    </nav>
  </header>;
}

function SceneRail({ active }: { active: string }) {
  return <>
    <div className="cin-progress-track" aria-hidden="true"><span id="cin-scroll-progress" /></div>
    <nav className="cin-rail" aria-label="Story chapters">
      {CHAPTERS.map((c,i) => <a href={'#'+c.id} key={c.id} aria-current={active===c.id ? 'location' : undefined}
        className={active===c.id ? 'is-current' : ''} title={c.short}>
        <span className="cin-rail-marker">0{i+1}</span><span className="cin-rail-name">{c.short}</span>
      </a>)}
    </nav>
  </>;
}

function Hero() {
  const slide=HERO_SLIDES[0];
  return <section className="scene cin-hero" id="top" aria-labelledby="hero-title">
    <div className="cin-hero-ambient" aria-hidden="true"/>
    <div className="cin-hero-grid cin-wrap">
      <div className="cin-hero-main">
        <ChapterLabel number="01 / 09">{slide.badge} / Ladder7 Nextstep Solutions</ChapterLabel>
        <h1 id="hero-title" data-cin-reveal>{slide.title}<em>{slide.titleHighlight}</em></h1>
        <div className="cin-hero-message" data-cin-reveal>
          <p>{slide.description}</p>
          <div className="cin-actions">
            <a className="cin-btn cin-btn-primary" href="#contact">{slide.primaryCta}<ArrowUpRight size={19}/></a>
            <a className="cin-btn cin-btn-ghost" href="#capabilities">{slide.secondaryCta}<ArrowRight size={18}/></a>
          </div>
        </div>
        <a href="#thinking" className="cin-scroll-invite"><span className="cin-scroll-ring"><ArrowDown size={19}/></span>Explore the experience</a>
      </div>
      <div className="cin-hero-canvas">
        <div className="cin-hero-hand"><NetworkGesture gesture="hero"/></div>
        <figure className="cin-hero-image">
          <img src={slide.image} alt="Ladder7 intelligent AI platform visual" width="5583" height="3722" fetchPriority="high"/>
          <figcaption><span>REAL-WORLD ENGINEERING</span><span>INTELLIGENT AI / LADDER7</span></figcaption>
        </figure>
        <span className="cin-hero-orbit" aria-hidden="true">ENGINEERING THE NEXT STEP</span>
      </div>
    </div>
    <div className="cin-hero-baseline" aria-hidden="true"><span>IDEAS</span><i/><span>ENGINEERING</span><i/><span>OUTCOMES</span></div>
  </section>;
}

function Vision() {
  const slides=HERO_SLIDES.slice(1);
  return <section className="scene cin-vision" id="thinking" aria-labelledby="thinking-title">
    <div className="cin-wrap cin-vision-intro">
      <ChapterLabel number="02 / 09">New perspectives / The vision</ChapterLabel>
      <div className="cin-vision-heading">
        <h2 id="thinking-title" data-cin-reveal>Complexity is real.<br/><em>The next step is clear.</em></h2>
        <div className="cin-vision-drawing"><NetworkGesture gesture="thinking" /></div>
      </div>
    </div>
    <div className="cin-vision-stories cin-wrap">
      <div className="cin-vision-rail"><span>Perspective / 01 — 03</span><strong>Ideas become systems.</strong><div className="cin-vision-line" aria-hidden="true"/></div>
      <div className="cin-vision-stack">
        {slides.map((slide,i)=><article className="cin-perspective" key={slide.id} data-cin-reveal>
          <div className="cin-perspective-meta"><span>0{i+1}</span><span>{slide.badge}</span></div>
          <div className="cin-perspective-image"><img loading="lazy" src={slide.image} alt={slide.badge+' visual from Ladder7 original website'} /></div>
          <div className="cin-perspective-copy">
            <h3>{slide.title}<em>{slide.titleHighlight}</em></h3>
            <p>{slide.description}</p>
            <div className="cin-inline-links">
              <a href="#contact">{slide.primaryCta} <ArrowUpRight size={16}/></a>
              <a href="#capabilities">{slide.secondaryCta} <ArrowRight size={16}/></a>
            </div>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}

function About() {
  return <section className="scene cin-about" id="about" aria-labelledby="about-title">
    <div className="cin-wrap">
      <ChapterLabel number="03 / 09">Who we are</ChapterLabel>
      <div className="cin-about-composition">
        <div className="cin-about-gesture"><NetworkGesture gesture="about"/></div>
        <div className="cin-about-message" data-cin-reveal>
          <span className="cin-overline">LADDER7 / NEXTSTEP SOLUTIONS</span>
          <h2 id="about-title">Every Business.<br/>Every Market.<br/><em>One Goal — Revenue.</em></h2>
          <p>We build intelligent digital systems for organisations ready to turn their online presence into their most powerful sales asset. At Ladder7 Nextstep Solutions, we believe every business — regardless of size — deserves a digital presence that actively generates revenue. We act as the strategic delivery partner for growth-focused organisations, translating digital ambition into measurable business outcomes.</p>
        </div>
      </div>
      <div className="cin-audiences">
        {AUDIENCES.map((item,i)=><article key={item.title} data-cin-reveal>
          <span className="cin-list-index">0{i+1} / WHO WE SERVE</span><h3>{item.title}</h3><p>{item.description}</p><ArrowUpRight size={25} aria-hidden="true"/>
        </article>)}
      </div>
    </div>
  </section>;
}

const SERVICE_GESTURES=['digital','automation','strategy','development'] as const;
const SERVICE_IMAGES=[
  '/images/hero/hero-digital-engineering.png',
  '/images/hero/hero-intelligent-automation.webp',
  '/images/hero/hero-cloud-architecture.webp',
  '/images/hero/hero-ai-platform.webp',
];

function Services() {
  const [active,setActive]=useState(0);
  const cap=CAPABILITIES[active];
  return <section className="scene cin-services" id="capabilities" aria-labelledby="services-title">
    <div className="cin-wrap">
      <div className="cin-services-intro">
        <div><ChapterLabel number="04 / 09">What we do</ChapterLabel>
          <h2 id="services-title" data-cin-reveal>Strategic<br/><em>Capabilities</em></h2>
          <p>Our four core pillars of excellence designed to future-proof your digital operations.</p></div>
        <a href="#contact" className="cin-arrow-link">View Full Service Catalog <ArrowUpRight size={19}/></a>
      </div>
      <div className="cin-services-theatre">
        <div className="cin-services-nav">
          {CAPABILITIES.map((item,i)=><article className={'service-line cin-service-row'+(active===i?' selected':'')} key={item.id}>
            <button type="button" onClick={()=>setActive(i)} aria-expanded={active===i} aria-controls={'service-panel-'+item.id}>
              <span className="cin-service-num">0{i+1}</span><span className="cin-service-name">{item.title}</span>
              <span className="cin-service-expand">{active===i?<ArrowUpRight size={24}/>:<Plus size={24}/>}</span>
            </button>
            <div className="service-body cin-service-details" id={'service-panel-'+item.id} hidden={active!==i}>
              <p>{item.description}</p>
              <ul aria-label={item.title+' capabilities'}>{item.tags.map(tag=><li key={tag}>{tag}</li>)}</ul>
              <a href="#contact">Discuss this capability <ArrowRight size={18}/></a>
            </div>
          </article>)}
        </div>
        <div className="cin-services-stage">
          <div className="cin-service-image" key={cap.id}><img src={SERVICE_IMAGES[active]} alt={cap.title+' — Ladder7 engineering visual'} loading="lazy" /></div>
          <span className="cin-services-watermark" aria-hidden="true">0{active+1}</span>
          <div className="cin-services-gesture"><NetworkGesture gesture={SERVICE_GESTURES[active]} className="services-art"/></div>
          <div className="cin-stage-caption"><span>CAPABILITY / 0{active+1} OF 04</span><strong>{cap.title}</strong></div>
        </div>
      </div>
    </div>
  </section>;
}

function Products() {
  const [selected,setSelected]=useState(0);
  const product=PRODUCTS[selected];
  const change=(index:number)=>setSelected((index+PRODUCTS.length)%PRODUCTS.length);
  return <section className="scene cin-products" id="products" aria-labelledby="products-title">
    <div className="cin-wrap">
      <ChapterLabel number="05 / 09">What we think / Our products</ChapterLabel>
      <div className="cin-products-intro">
        <h2 id="products-title" data-cin-reveal>Intelligent Products for<br/><em>Every Corner of Your Business</em></h2>
        <p>From web performance and marketing analytics to sales, data, and operations, each product is designed to end in an action rather than a report.</p>
      </div>
      <div className="cin-product-tabs product-index" role="tablist" aria-label="Explore Ladder7 products" aria-orientation="horizontal">
        {PRODUCTS.map((item,i)=><button type="button" key={item.id} id={'product-tab-'+item.id} role="tab" aria-controls="product-panel"
          aria-selected={selected===i} tabIndex={selected===i?0:-1} onClick={()=>change(i)}
          onKeyDown={event=>{
            if (event.key==='ArrowRight'||event.key==='ArrowDown'||event.key==='ArrowLeft'||event.key==='ArrowUp'||event.key==='Home'||event.key==='End') {
              event.preventDefault();
              const next=event.key==='Home'?0:event.key==='End'?PRODUCTS.length-1:
                selected+(event.key==='ArrowRight'||event.key==='ArrowDown'?1:-1);
              const target=(next+PRODUCTS.length)%PRODUCTS.length;
              change(target); document.getElementById('product-tab-'+PRODUCTS[target].id)?.focus();
            }
          }}><span>0{i+1}</span><strong>{item.name}</strong></button>)}
      </div>
      <div className="cin-product-stage product-content" key={product.id} id="product-panel" role="tabpanel" aria-labelledby={'product-tab-'+product.id}>
        <div className="cin-product-display product-visual">
          <div className="cin-product-topbar" aria-hidden="true"><span>LADDER7 / DIGITAL PRODUCT</span><span>0{selected+1} / 0{PRODUCTS.length}</span></div>
          <div className="cin-product-frame"><img loading="lazy" width="740" height="580" src={product.image} alt={'Original Ladder7 product showcase visual for '+product.name}/></div>
          <div className="cin-product-gesture"><NetworkGesture gesture="products" className="product-gesture"/></div>
          <span className="cin-product-display-label">LADDER7 / PRODUCT ECOSYSTEM</span>
        </div>
        <div className="cin-product-information">
          <span className="cin-overline">SELECTED PRODUCT / 0{selected+1}</span>
          <h3>{product.name}</h3><p className="cin-product-tagline">{product.tagline}</p>
          <p className="cin-product-description">{product.description}</p>
          <ul className="cin-features">{product.features.map(f=><li key={f}><Check size={16}/>{f}</li>)}</ul>
          <div className="cin-product-actions">
            <a href="#contact">{product.ctaPrimary}<ArrowUpRight size={17}/></a>
            <a href="#contact">Book a demo <ArrowRight size={17}/></a>
          </div>
          <div className="cin-product-pagination">
            <button type="button" aria-label="Previous product" onClick={()=>change(selected-1)}><ArrowLeft size={21}/></button>
            <span>0{selected+1} <small>/ 0{PRODUCTS.length}</small></span>
            <button type="button" aria-label="Next product" onClick={()=>change(selected+1)}><ArrowRight size={21}/></button>
          </div>
        </div>
      </div>
    </div>
  </section>;
}

function Engineering() {
  const slide=HERO_SLIDES[2];
  return <section className="scene cin-engineering" id="engineering" aria-labelledby="engineering-title">
    <div className="cin-engineering-photo" aria-hidden="true">
      <img src={slide.image} loading="lazy" alt="" />
    </div>
    <div className="cin-wrap cin-engineering-content">
      <ChapterLabel number="06 / 09">Engineering / Innovation</ChapterLabel>
      <div className="cin-engineering-copy" data-cin-reveal>
        <span className="cin-overline">{slide.badge}</span>
        <h2 id="engineering-title">{slide.title}<em>{slide.titleHighlight}</em></h2>
        <p>{slide.description}</p>
        <a href="#contact" className="cin-btn cin-btn-ghost">{slide.primaryCta} <ArrowUpRight size={19}/></a>
      </div>
      <div className="cin-engineering-art"><NetworkGesture gesture="strategy"/></div>
      <span className="cin-engineering-side" aria-hidden="true">DESIGNED TO CONNECT</span>
    </div>
  </section>;
}

function Why() {
  return <section className="scene cin-why" id="why-ladder7" aria-labelledby="why-title">
    <div className="cin-wrap">
      <ChapterLabel number="07 / 09">Why Ladder7</ChapterLabel>
      <div className="cin-why-top">
        <h2 id="why-title" data-cin-reveal>Why Innovators<br/><em>Partner With Ladder7</em></h2>
        <div className="cin-why-art"><NetworkGesture gesture="why"/>
          <img src="/images/hero/hero-digital-engineering.png" loading="lazy" width="5583" height="3722" alt="Digital engineering imagery from Ladder7"/>
        </div>
      </div>
      <div className="cin-value-list">
        {VALUE_PILLARS.map((item,i)=><article key={item.title} data-cin-reveal>
          <span className="cin-value-index">0{i+1} — OUR APPROACH</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <ArrowUpRight size={23} aria-hidden="true"/>
        </article>)}
      </div>
    </div>
  </section>;
}

function FAQ() {
  const [openId,setOpenId]=useState<string|null>(FAQS[0]?.id??null);
  return <section className="scene cin-faq" id="faq" aria-labelledby="faq-title">
    <div className="cin-wrap cin-faq-grid">
      <div className="cin-faq-intro">
        <ChapterLabel number="08 / 09">Your questions, answered</ChapterLabel>
        <h2 id="faq-title" data-cin-reveal>Better questions.<br/><em>Clearer next steps.</em></h2>
        <div className="cin-faq-hand"><NetworkGesture gesture="faq"/></div>
        <p className="cin-faq-caption">A connection begins with a question.</p>
      </div>
      <div className="cin-faq-list">
        {FAQS.map((item,i)=><article key={item.id} className={'faq-entry cin-faq-item'+(openId===item.id?' is-open':'')}>
          <h3><button id={'faq-button-'+item.id} type="button" onClick={()=>setOpenId(openId===item.id?null:item.id)}
            aria-expanded={openId===item.id} aria-controls={'faq-answer-'+item.id}>
            <span>0{i+1}</span><strong>{item.question}</strong><ChevronDown size={23}/></button></h3>
          <div id={'faq-answer-'+item.id} role="region" aria-labelledby={'faq-button-'+item.id} hidden={openId!==item.id}>
            <p>{item.answer}</p>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}

function Contact() {
  return <section className="scene cin-finale" id="contact" aria-labelledby="contact-title">
    <div className="cin-wrap cin-finale-inner">
      <ChapterLabel number="09 / 09">The final connection</ChapterLabel>
      <h2 id="contact-title" data-cin-reveal>Your Website Should Be<br/><em>Generating Revenue Right Now.</em></h2>
      <div className="cin-finale-hands"><NetworkGesture gesture="contact"/></div>
      <p>Partner with Ladder7 to build an intelligent, connected, and scalable digital revenue system — engineered for your markets, your goals, and your growth.</p>
      <a className="cin-btn cin-btn-primary cin-finale-btn" href="mailto:info@ladder7.in?subject=Start%20Your%20Revenue%20Engine">
        Start Your Revenue Engine Today <ArrowUpRight size={22}/></a>
      <div className="cin-finale-contact">
        <a href="mailto:info@ladder7.in">info@ladder7.in <ArrowUpRight size={18}/></a>
        <a href="tel:+918137979401">+91 8137979401 <ArrowUpRight size={18}/></a>
      </div>
    </div>
  </section>;
}

function Footer({ light }: { light:boolean }) {
  return <footer className="cin-footer" id="footer">
    <div className="cin-wrap">
      <div className="cin-footer-lead">
        <img src={light?'/images/logos/logo-primary.webp':'/images/logos/logo-white.webp'} width="200" height="80" loading="lazy" alt="Ladder7 Nextstep Solutions"/>
        <p>Technology connects people.<br/><strong>Let's build what's next.</strong></p>
        <a href="#top">Back to top <ArrowUpRight size={17}/></a>
      </div>
      <div className="cin-footer-grid">
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
          <h3 className="cin-follow-label">Follow us</h3>
          <div className="cin-socials">{SOCIAL.map(link=><a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={'Ladder7 on '+link.label}>
            {link.label}<ArrowUpRight size={15}/></a>)}</div>
        </div>
      </div>
      <div className="cin-footer-base"><span>© 2026 Ladder7 NextStep Solutions. All rights reserved.</span><a href="#contact">Privacy Policy</a></div>
    </div>
  </footer>;
}

export default function CinematicApp() {
  const [light,setLight]=useState(()=>{
    try { return localStorage.getItem('theme')==='light'; } catch { return false; }
  });
  const activeChapter=useScrollDirector();
  useEffect(()=>{
    document.documentElement.dataset.theme=light?'light':'dark';
    try { localStorage.setItem('theme',light?'light':'dark'); } catch { /* optional */ }
  },[light]);

  return <div className="cin-site">
    <a className="cin-skip" href="#main-content">Skip to content</a>
    <Header light={light} setLight={setLight}/>
    <SceneRail active={activeChapter}/>
    <main id="main-content">
      <Hero/>
      <Vision/>
      <About/>
      <Services/>
      <Products/>
      <Engineering/>
      <Why/>
      <FAQ/>
      <Contact/>
      <section className="cin-training" id="training">
        <div className="cin-wrap"><div><span className="cin-overline">Ladder7 / Education</span><h2>Corporate Training</h2></div>
          <a href="mailto:info@ladder7.in?subject=Corporate%20Training">Contact Us <ArrowUpRight size={19}/></a></div>
      </section>
    </main>
    <Footer light={light}/>
  </div>;
}
