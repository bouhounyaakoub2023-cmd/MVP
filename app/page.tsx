import Link from 'next/link';

const domains = [
  ['Production', '337651'],
  ['Maintenance', 'b8791d'],
  ['QHSE', '596367'],
  ['Data', 'f2f0e8'],
  ['AI Core', 'b8791d'],
] as const;

export default function Home() {
  return (
    <main>
      <section className="spatial">
        <div className="container">
          <div className="hero-copy">
            <div className="eyebrow">Industrial AI / Automation</div>
            <h1 className="hero-title">TURN INDUSTRIAL DATA<br/>INTO ACTION.</h1>
            <p className="hero-sub">Connect fragmented operational data to intelligence, clear decisions and automated action.</p>
            <div style={{marginTop:28,display:'flex',gap:12}}>
              <Link href="/contact" className="button button-green">REQUEST A PILOT</Link>
              <Link href="/demo" className="button button-dark">EXPLORE DEMO</Link>
            </div>
          </div>
          <div className="network" aria-label="Industrial intelligence network">
            <span className="rail r1"/><span className="rail r2"/><span className="rail r3"/><span className="rail r4"/>
            <div className="node node-a">PRODUCTION</div><div className="node node-b">MAINTENANCE</div>
            <div className="node node-c">QHSE</div><div className="node node-d">DATA</div><div className="node node-e">AI CORE</div>
            <div className="flow"><small>RAW INDUSTRIAL DATA</small>→ AI + AUTOMATION → OPERATIONAL INTELLIGENCE</div>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="eyebrow">The problem</div>
          <h2 style={{fontSize:48,lineHeight:1.02,maxWidth:760,letterSpacing:'-.04em'}}>Your factory already has data. The bottleneck is turning it into a decision.</h2>
          <div className="grid" style={{marginTop:45}}>
            {['Fragmented Excel, PDF, email and forms','Manual reporting and consolidation','Delayed visibility into recurring operational issues'].map(x=><article className="card" key={x}><h3>{x}</h3><p>We connect the existing workflow instead of replacing the factory with another ERP.</p></article>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="eyebrow">Industrial Operations Intelligence</div>
          <h2 style={{fontSize:48,lineHeight:1.02,maxWidth:700,letterSpacing:'-.04em'}}>From operational signals to action.</h2>
          <div className="grid" style={{marginTop:45}}>
            <article className="card dark-card"><h3>Automated Reporting</h3><p>Turn recurring operational data into management-ready reports without manual consolidation.</p></article>
            <article className="card dark-card"><h3>Incident Intelligence</h3><p>Convert technician and HSE narratives into structured events, patterns, alerts and follow-up.</p></article>
            <article className="card dark-card"><h3>Industrial Data Layer</h3><p>Unify data from spreadsheets, systems, documents and forms into an operational model.</p></article>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container" style={{display:'flex',justifyContent:'space-between',gap:50,alignItems:'end',flexWrap:'wrap'}}>
          <div><div className="eyebrow">See it working</div><h2 style={{fontSize:48,lineHeight:1.02,maxWidth:650,letterSpacing:'-.04em'}}>Explore a synthetic factory before connecting your own data.</h2></div>
          <Link href="/demo" className="button button-green">OPEN DEMO LAB</Link>
        </div>
      </section>
      <footer className="footer"><div className="container">Industrial Intelligence · Data → AI → Automation → Action</div></footer>
    </main>
  );
}