import Link from 'next/link';

export function SiteHeader() {
  return (
    <>
      <header className="site-header">
        <div className="container nav">
          <Link href="/" className="brand brand-lockup" aria-label="ORBITRA Industrial Intelligence home">
            <span className="brand-symbol" aria-hidden="true">◯</span>
            <span className="brand-name">ORBITRA</span><span className="brand-divider">|</span><span className="brand-muted">INDUSTRIAL INTELLIGENCE</span>
          </Link>
          <nav className="nav-links" aria-label="Primary navigation">
            <Link href="/solutions">Solutions</Link>
            <Link href="/demo">Demo Lab</Link>
            <Link href="/industries">Industries</Link>
            <Link href="/experience">How It Works</Link>
            <Link href="/about">About</Link>
          </nav>
          <div className="nav-actions">
            <span className="nav-search" aria-hidden="true">⌕</span>
            <Link href="/contact" className="button button-lunar nav-cta">Request a Pilot <span>→</span></Link>
            <span className="nav-locale">EN <i>|</i> FR</span>
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
        <span>ORBITRA | INDUSTRIAL INTELLIGENCE</span>
        <span>DATA · PEOPLE · MACHINES · A CLEANER TOMORROW</span>
      </div>
      <div className="container footer-grid">
        <div className="footer-intro">
          <div className="footer-kicker">From data to real operations.</div>
          <h2>Build intelligence<br /><span>around the operation.</span></h2>
          <Link href="/contact" className="footer-cta">Request a Pilot <span>→</span></Link>
        </div>
        <div className="footer-column"><strong>Explore</strong><Link href="/solutions">Solutions</Link><Link href="/demo">Demo Lab</Link><Link href="/industries">Industries</Link><Link href="/experience">How It Works</Link></div>
        <div className="footer-column"><strong>Company</strong><Link href="/about">About</Link><Link href="/contact">Contact</Link></div>
        <div className="footer-column footer-note"><strong>Operational systems</strong><p>We turn fragmented industrial information into decisions, workflows and measurable action.</p><Link href="/contact">Bring us a problem →</Link></div>
      </div>
      <div className="container footer-wordmark" aria-hidden="true">ORBITRA</div>
      <div className="container footer-bottom"><span>All systems operational</span><span>© 2026 ORBITRA</span><span>Privacy · Terms</span></div>
    </footer>
  );
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  return <><SiteHeader />{children}<SiteFooter /></>;
}
