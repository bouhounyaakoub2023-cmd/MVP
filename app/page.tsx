import Link from 'next/link';
import { PageFrame } from '../components/site-shell';

const signals = ['INDUSTRIAL DATA', 'AI SYSTEMS', 'AUTOMATION', 'ENGINEERING'];
const solutions = [
  ['01', 'Automated Reporting', 'Turn recurring Excel, forms and operational inputs into management-ready reports.'],
  ['02', 'Maintenance Intelligence', 'Structure incident narratives, surface recurring failures and trigger the right follow-up.'],
  ['03', 'Industrial Data', 'Connect fragmented operational information into a reliable layer for analysis and action.'],
];

export default function Home() {
  return <PageFrame>
    <main>
      <div className="announcement"><span>INDUSTRIAL INTELLIGENCE</span><span>AI + DATA + AUTOMATION FOR OPERATIONS</span><span>01 / 2026</span></div>

      <section className="hero hero-dark">
        <div className="container hero-grid">
          <div className="hero-copy reveal">
            <div className="eyebrow inverse">We engineer the layer between data and action.</div>
            <h1>Industrial operations should <em>move</em> as fast as the data.</h1>
            <p className="hero-lead">We build AI, data and automation systems around the way industrial companies already work — then turn fragmented information into decisions, workflows and measurable action.</p>
            <div className="hero-actions"><Link href="/solutions" className="button button-green">Explore solutions ↗</Link><Link href="/contact" className="button button-outline">I have a different problem</Link></div>
          </div>
          <div className="hero-orbit" aria-hidden="true">
            <div className="orbit orbit-1"/><div className="orbit orbit-2"/><div className="orbit orbit-3"/>
            <div className="core"><span>DATA</span><strong>→</strong><span>ACTION</span></div>
            <div className="orbit-label l1">EXCEL / ERP / PDF</div><div className="orbit-label l2">AI REASONING</div><div className="orbit-label l3">AUTOMATION</div>
          </div>
        </div>
        <div className="ticker">{signals.concat(signals).map((s,i)=><span key={i}>{s}<b>✦</b></span>)}</div>
      </section>

      <section className="section-light intro-section">
        <div className="container split-intro">
          <div><div className="eyebrow">The opportunity</div><h2>Your factory already produces the signals. The problem is what happens <span>between</span> the signal and the decision.</h2></div>
          <div className="intro-aside"><p>Reports in spreadsheets. Incidents in messages. Documents in folders. Decisions in people's heads.</p><p>We connect those fragments without asking the operation to start from zero.</p><Link href="/services" className="text-link">See how we work →</Link></div>
        </div>
      </section>

      <section className="section solutions-preview">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow inverse">Standard solutions</div><h2>Start with a problem<br/>we already solved.</h2></div><Link href="/solutions" className="text-link light">View all solutions ↗</Link></div>
          <div className="solution-list">{solutions.map(([n,title,desc])=><Link href="/solutions" className="solution-row" key={n}><span className="solution-no">{n}</span><div><h3>{title}</h3><p>{desc}</p></div><span className="row-arrow">↗</span></Link>)}</div>
        </div>
      </section>

      <section className="choice-section">
        <div className="container"><div className="eyebrow">Two ways to work with us</div><h2>Already know what you need?<br/><span>Or bring us the problem.</span></h2>
          <div className="choice-grid">
            <Link href="/solutions" className="choice-card standard"><span className="choice-kicker">01 / STANDARD</span><h3>Choose a solution.</h3><p>Use one of our standardized industrial solutions through the platform. Built to be repeatable, measurable and deployable.</p><span className="choice-cta">Explore standard solutions →</span></Link>
            <Link href="/contact" className="choice-card personal"><span className="choice-kicker">02 / PERSONAL</span><h3>Bring us the problem.</h3><p>If your workflow is specific, unusual or not on the list, tell us what is costing you time, money or visibility.</p><span className="choice-cta">Request a personal solution →</span></Link>
          </div>
        </div>
      </section>

      <section className="section-light proof-section"><div className="container proof-grid"><div><div className="eyebrow">Our approach</div><h2>Don't replace the factory.<br/>Improve the system around it.</h2></div><div className="proof-steps"><div><span>01</span><p>Understand the workflow</p></div><div><span>02</span><p>Structure the data</p></div><div><span>03</span><p>Engineer the intelligence</p></div><div><span>04</span><p>Automate the response</p></div></div></div></section>

      <section className="final-cta hero-dark"><div className="container final-cta-inner"><div className="eyebrow inverse">Have a workflow worth fixing?</div><h2>Let's turn the operational problem into a system.</h2><div className="hero-actions"><Link href="/contact" className="button button-green">Start a conversation ↗</Link><Link href="/demo" className="button button-outline">Open demo lab</Link></div></div></section>
    </main>
  </PageFrame>;
}
