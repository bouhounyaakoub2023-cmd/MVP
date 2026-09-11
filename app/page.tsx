import Link from 'next/link';
import { PageFrame } from '../components/site-shell';
import { HeroVisual, Reveal } from '../components/motion-reveal';

const heroImage = 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image/images/39d7b7bc-6af3-4be9-b701-f48afacbb0bc/40b895a3-bd74-4d88-9aa7-71f4aeaec1f7/Premium_editorial_hero_artwork_for_a_serious_industrial_AI_a.png?_jwt=eyJhbGciOiJIUzI1NiJ9.eyJrZXlIYXNoIjoiMDJhNDBlMzgxYjUzOTU0ZCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTMyNjc3Nn0.YJckeSd9kOmCrTj52X3GpcgJ2whqdX20sd_CE5EF_X8';

const signals = ['INDUSTRIAL DATA', 'AI SYSTEMS', 'AUTOMATION', 'ENGINEERING'];
const solutions = [
  ['01', 'Automated Reporting', 'Turn recurring Excel, forms and operational inputs into management-ready reports.'],
  ['02', 'Maintenance Intelligence', 'Structure incident narratives, surface recurring failures and trigger the right follow-up.'],
  ['03', 'Industrial Data', 'Connect fragmented operational information into a reliable layer for analysis and action.'],
];
const lifecycle = [
  ['01', 'PROBLEM', 'Find the operational friction worth solving.'],
  ['02', 'DATA', 'Collect the information the workflow already produces.'],
  ['03', 'INTELLIGENCE', 'Add extraction, analysis and reasoning where it creates leverage.'],
  ['04', 'AUTOMATION', 'Connect the decision to the next operational step.'],
  ['05', 'ACTION', 'Put the result back into the workflow, not another dashboard.'],
];

export default function Home() {
  return <PageFrame>
    <main>
      <section className="hero hero-dark hero-editorial">
        <div className="container hero-editorial-grid">
          <div className="hero-copy reveal">
            <div className="hero-index"><span>01</span><span>INDUSTRIAL INTELLIGENCE</span></div>
            <div className="eyebrow inverse">We engineer the layer between data and action.</div>
            <h1>Industrial operations should <em>move</em> as fast as the data.</h1>
            <p className="hero-lead">AI, data and automation systems built around the way industrial companies already work — turning fragmented information into decisions, workflows and measurable action.</p>
            <div className="hero-actions"><Link href="/solutions" className="button button-light">Explore solutions ↗</Link><Link href="/contact" className="button button-outline">I have a different problem</Link></div>
          </div>
          <HeroVisual imageUrl={heroImage} />
        </div>
        <div className="hero-system-line"><span>DATA SOURCES</span><i /><span>AI REASONING</span><i /><span>AUTOMATION</span><i /><span>ACTION</span></div>
        <div className="ticker">{signals.concat(signals).map((s,i)=><span key={i}>{s}<b>✦</b></span>)}</div>
      </section>

      <section className="section-light intro-section">
        <div className="container split-intro">
          <Reveal><div className="eyebrow">The opportunity</div><h2>Your factory already produces the signals. The problem is what happens <span>between</span> the signal and the decision.</h2></Reveal>
          <Reveal delay={0.12}><div className="intro-aside"><p>Reports in spreadsheets. Incidents in messages. Documents in folders. Decisions in people's heads.</p><p>We connect those fragments without asking the operation to start from zero.</p><Link href="/services" className="text-link">See how we work →</Link></div></Reveal>
        </div>
      </section>

      <section className="lifecycle-section">
        <div className="container">
          <Reveal><div className="section-head lifecycle-head"><div><div className="eyebrow inverse">The system</div><h2>From operational friction<br/>to operational <span>action.</span></h2></div><p>One continuous layer — not five disconnected tools.</p></div></Reveal>
          <div className="lifecycle-track">
            {lifecycle.map(([n,title,desc], i) => <Reveal key={n} delay={i * 0.06}><div className="lifecycle-step"><div className="lifecycle-top"><span>{n}</span>{i < lifecycle.length - 1 && <b>→</b>}</div><h3>{title}</h3><p>{desc}</p></div></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section solutions-preview">
        <div className="container">
          <Reveal><div className="section-head"><div><div className="eyebrow inverse">Standard solutions</div><h2>Start with a problem<br/>we already solved.</h2></div><Link href="/solutions" className="text-link light">View all solutions ↗</Link></div></Reveal>
          <div className="solution-list">{solutions.map(([n,title,desc], i)=><Reveal key={n} delay={i * 0.08}><Link href="/solutions" className="solution-row"><span className="solution-no">{n}</span><div><h3>{title}</h3><p>{desc}</p></div><span className="row-arrow">↗</span></Link></Reveal>)}</div>
        </div>
      </section>

      <section className="choice-section">
        <div className="container"><Reveal><div className="eyebrow">Two ways to work with us</div><h2>Already know what you need?<br/><span>Or bring us the problem.</span></h2></Reveal>
          <div className="choice-grid">
            <Reveal><Link href="/solutions" className="choice-card standard"><span className="choice-kicker">01 / STANDARD</span><h3>Choose a solution.</h3><p>Use one of our standardized industrial solutions through the platform. Built to be repeatable, measurable and deployable.</p><span className="choice-cta">Explore standard solutions →</span></Link></Reveal>
            <Reveal delay={0.1}><Link href="/contact" className="choice-card personal"><span className="choice-kicker">02 / PERSONAL</span><h3>Bring us the problem.</h3><p>If your workflow is specific, unusual or not on the list, tell us what is costing you time, money or visibility.</p><span className="choice-cta">Request a personal solution →</span></Link></Reveal>
          </div>
        </div>
      </section>

      <section className="section-light proof-section"><div className="container proof-grid"><Reveal><div><div className="eyebrow">Our approach</div><h2>Don't replace the factory.<br/>Improve the system around it.</h2></div></Reveal><Reveal delay={0.12}><div className="proof-steps"><div><span>01</span><p>Understand the workflow</p></div><div><span>02</span><p>Structure the data</p></div><div><span>03</span><p>Engineer the intelligence</p></div><div><span>04</span><p>Automate the response</p></div></div></Reveal></div></section>

      <section className="final-cta hero-dark"><div className="container final-cta-inner"><Reveal><div className="eyebrow inverse">Have a workflow worth fixing?</div><h2>Let's turn the operational problem into a system.</h2><div className="hero-actions"><Link href="/contact" className="button button-light">Start a conversation ↗</Link><Link href="/demo" className="button button-outline">Open demo lab</Link></div></Reveal></div></section>
    </main>
  </PageFrame>;
}
