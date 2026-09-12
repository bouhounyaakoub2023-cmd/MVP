import Link from 'next/link';
import { PageFrame } from '../components/site-shell';
import { Reveal } from '../components/motion-reveal';

const heroImage = 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image/images/39d7b7bc-6af3-4be9-b701-f48afacbb0bc/40b895a3-bd74-4d88-9aa7-71f4aeaec1f7/Premium_editorial_hero_artwork_for_a_serious_industrial_AI_a.png?_jwt=eyJhbGciOiJIUzI1NiJ9.eyJrZXlIYXNoIjoiMDJhNDBlMzgxYjUzOTU0ZCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTMyNjc3Nn0.YJckeSd9kOmCrTj52X3GpcgJ2whqdX20sd_CE5EF_X8';
const engravedImages = {
  rocket: 'https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=1400&q=80',
  lightning: 'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=1200&q=80',
};

const solutions = [
  ['01', 'Production Intelligence', 'From production data to performance, variance and action-ready insight.'],
  ['02', 'Maintenance Intelligence', 'Turn incident narratives into structured events, patterns and follow-up.'],
  ['03', 'QHSE Intelligence', 'Transform operational events into safer, traceable responses.'],
  ['04', 'Document Intelligence', 'Move from scattered documents to structured operational data.'],
];
const lifecycle = [
  ['01', 'CONNECT', 'Bring together the information your operation already produces.'],
  ['02', 'UNDERSTAND', 'Structure the signal and expose what matters.'],
  ['03', 'AUTOMATE', 'Connect intelligence to the next operational step.'],
  ['04', 'DRIVE', 'Measure the result in the real operation.'],
];

export default function Home() {
  return <PageFrame>
    <main>
      <section className="hero hero-orbitra">
        <div className="hero-orbitra-art" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="hero-orbitra-overlay" />
        <div className="orbit-path orbit-path-one" />
        <div className="orbit-path orbit-path-two" />
        <div className="orbit-dot orbit-dot-one" />
        <div className="orbit-dot orbit-dot-two" />
        <div className="container orbitra-hero-content">
          <div className="hero-copy">
            <div className="hero-index"><span>01</span><span>FROM DATA TO REAL OPERATIONS</span></div>
            <div className="eyebrow inverse">Industrial intelligence</div>
            <h1>TURN<br/>INDUSTRIAL DATA<br/>INTO <span>ACTION</span></h1>
            <p className="hero-lead">We help industrial teams transform fragmented operational information into clear insights, automated workflows and measurable impact.</p>
            <div className="hero-actions"><Link href="/contact" className="button button-lunar">Request a Pilot <span>→</span></Link><Link href="/demo" className="button button-outline">Explore Demo Lab</Link></div>
          </div>
          <div className="hero-side-note"><span>HIGHER<br/>PRODUCTIVITY<br/>CLEANER OPERATIONS<br/>BRIGHTER TOMORROW</span><i /></div>
          <div className="hero-metrics"><div><strong>+42%</strong><span>OPERATIONAL<br/>EFFICIENCY</span></div><div><strong>-30%</strong><span>DOWNTIME</span></div><div><strong>+25%</strong><span>PRODUCTIVITY</span></div></div>
          <div className="hero-status"><span>REAL DATA</span><span>REAL INSIGHTS</span><span>REAL PROGRESS</span></div>
        </div>
        <div className="container hero-solutions-grid">
          {solutions.map(([n,title,desc]) => <Link href="/solutions" className="hero-solution-card" key={n}>
            <span className="card-no">{n}</span><h3>{title}</h3><p>{desc}</p><span className="card-arrow">↗</span>
          </Link>)}
        </div>
        <div className="hero-trusted container"><span>TRUSTED BY<br/>INDUSTRIAL LEADERS</span><div>SONATRACH</div><div>ALSTOM</div><div>SIEMENS</div><div>TotalEnergies</div><div>Schneider Electric</div><div>ArcelorMittal</div></div>
      </section>

      <section className="section-light intro-section">
        <div className="container split-intro">
          <Reveal><div className="eyebrow">The opportunity</div><h2>Your operation already produces the signals. We build the intelligence layer that turns them into decisions.</h2></Reveal>
          <Reveal delay={0.12}><div className="intro-aside"><p>Reports in spreadsheets. Incidents in messages. Documents in folders. Decisions in people's heads.</p><p>ORBITRA connects those fragments without asking the operation to start from zero.</p><Link href="/experience" className="text-link">See how it works →</Link></div></Reveal>
        </div>
      </section>

      <section className="lifecycle-section">
        <div className="container">
          <Reveal><div className="section-head lifecycle-head"><div><div className="eyebrow inverse">The system</div><h2>CONNECT.<br/>UNDERSTAND.<br/>AUTOMATE.<br/><span>DRIVE.</span></h2></div><p>One continuous layer between industrial information and action.</p></div></Reveal>
          <div className="lifecycle-track">
            {lifecycle.map(([n,title,desc], i) => <Reveal key={n} delay={i * 0.06}><div className="lifecycle-step"><div className="lifecycle-top"><span>{n}</span>{i < lifecycle.length - 1 && <b>→</b>}</div><h3>{title}</h3><p>{desc}</p></div></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section solutions-preview orbitra-solutions">
        <div className="container">
          <Reveal><div className="section-head"><div><div className="eyebrow inverse">Our solutions</div><h2>FROM INDUSTRIAL DATA<br/>TO OPERATIONAL <span>INTELLIGENCE</span></h2></div><Link href="/solutions" className="text-link light">View all solutions ↗</Link></div></Reveal>
          <div className="solution-grid">{solutions.map(([n,title,desc], i)=><Reveal key={n} delay={i * 0.08}><Link href="/solutions" className="solution-card"><div className="solution-card-media" style={{ backgroundImage: `url(${i === 1 ? engravedImages.rocket : i === 2 ? engravedImages.lightning : heroImage})` }} /><div className="solution-card-content"><span>{n}</span><h3>{title}</h3><p>{desc}</p><span className="row-arrow">↗</span></div></Link></Reveal>)}</div>
        </div>
      </section>

      <section className="choice-section">
        <div className="container"><Reveal><div className="eyebrow">Built for the real operation</div><h2>Start with the system.<br/><span>Scale with the operation.</span></h2></Reveal>
          <div className="choice-grid">
            <Reveal><Link href="/solutions" className="choice-card standard"><span className="choice-kicker">01 / STANDARD</span><h3>Choose a solution.</h3><p>Use one of our standardized industrial solutions through the platform. Built to be repeatable, measurable and deployable.</p><span className="choice-cta">Explore standard solutions →</span></Link></Reveal>
            <Reveal delay={0.1}><Link href="/contact" className="choice-card personal"><span className="choice-kicker">02 / PERSONAL</span><h3>Bring us the problem.</h3><p>If your workflow is specific, unusual or not on the list, tell us what is costing you time, money or visibility.</p><span className="choice-cta">Request a personal solution →</span></Link></Reveal>
          </div>
        </div>
      </section>

      <section className="section-light proof-section"><div className="container proof-grid"><Reveal><div><div className="eyebrow">Our approach</div><h2>Don't replace the factory.<br/>Improve the system around it.</h2></div></Reveal><Reveal delay={0.12}><div className="proof-steps"><div><span>01</span><p>Understand the workflow</p></div><div><span>02</span><p>Structure the data</p></div><div><span>03</span><p>Engineer the intelligence</p></div><div><span>04</span><p>Automate the response</p></div></div></Reveal></div></section>

      <section className="final-cta hero-dark"><div className="container final-cta-inner"><Reveal><div className="eyebrow inverse">Have a workflow worth fixing?</div><h2>Let's turn the operational problem into a system.</h2><div className="hero-actions"><Link href="/contact" className="button button-lunar">Start a conversation ↗</Link><Link href="/demo" className="button button-outline">Open demo lab</Link></div></Reveal></div></section>
    </main>
  </PageFrame>;
}
