import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container nav">
        <Link href="/" className="brand">INDUSTRIAL<span>INTELLIGENCE</span></Link>
        <nav className="nav-links">
          <Link href="/solutions">Solutions</Link>
          <Link href="/services">Services</Link>
          <Link href="/industries">Industries</Link>
          <Link href="/experience">Experience</Link>
          <Link href="/about">About</Link>
        </nav>
        <Link href="/contact" className="button button-green nav-cta">Talk to us ↗</Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div><div className="brand">INDUSTRIAL<span>INTELLIGENCE</span></div><p>Operational problems → engineered systems.</p></div>
        <div><strong>Explore</strong><Link href="/solutions">Standard solutions</Link><Link href="/services">Services</Link><Link href="/experience">Experience</Link></div>
        <div><strong>Work with us</strong><Link href="/contact">Start a standard solution</Link><Link href="/contact">Request a personal solution</Link></div>
      </div>
      <div className="container footer-bottom"><span>Data · AI · Automation · Engineering</span><span>© 2026 Industrial Intelligence</span></div>
    </footer>
  );
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  return <><SiteHeader />{children}<SiteFooter /></>;
}
