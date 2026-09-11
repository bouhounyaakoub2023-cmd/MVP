import Link from 'next/link';

export function SiteHeader() {
  return (
    <>
      <div className="site-promo">
        <span className="site-promo-mark">✦</span>
        <span>Industrial AI / Data / Automation</span>
        <Link href="/demo">Open the Demo Lab <span aria-hidden="true">↗</span></Link>
      </div>
      <header className="site-header">
        <div className="container nav">
          <Link href="/" className="brand brand-lockup" aria-label="Industrial Intelligence home">
            <span className="brand-symbol" aria-hidden="true">◈</span>
            <span className="brand-name">INDUSTRIAL</span><span className="brand-muted">INTELLIGENCE</span>
          </Link>
          <nav className="nav-links" aria-label="Primary navigation">
            <Link href="/solutions">Solutions <span>⌄</span></Link>
            <Link href="/services">Services <span>⌄</span></Link>
            <Link href="/industries">Industries</Link>
            <Link href="/experience">Experience</Link>
            <Link href="/about">About</Link>
          </nav>
          <div className="nav-actions">
            <Link href="/demo" className="nav-secondary">Demo Lab</Link>
            <Link href="/contact" className="button button-light nav-cta">Talk to us ↗</Link>
          </div>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-topline">
        <span>INDUSTRIAL INTELLIGENCE / 2026</span>
        <span>Data · AI · Automation · Engineering</span>
      </div>
      <div className="container footer-grid">
        <div className="footer-intro">
          <div className="footer-kicker">The layer between data and action.</div>
          <h2>Build the system<br /><span>around the operation.</span></h2>
          <Link href="/contact" className="footer-cta">Start a conversation <span>↗</span></Link>
        </div>
        <div className="footer-column"><strong>Explore</strong><Link href="/solutions">Solutions</Link><Link href="/services">Services</Link><Link href="/industries">Industries</Link><Link href="/experience">Experience</Link></div>
        <div className="footer-column"><strong>Company</strong><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/demo">Demo Lab</Link></div>
        <div className="footer-column footer-note"><strong>Operational systems</strong><p>We turn fragmented industrial information into decisions, workflows and action.</p><Link href="/contact">Bring us a problem →</Link></div>
      </div>
      <div className="container footer-wordmark" aria-hidden="true">INDUSTRIAL</div>
      <div className="container footer-bottom"><span>All systems operational</span><span>© 2026 Industrial Intelligence</span><span>Privacy · Terms</span></div>
    </footer>
  );
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  return <><SiteHeader />{children}<SiteFooter /></>;
}
