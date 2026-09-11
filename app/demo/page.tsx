import Link from 'next/link';
import { PageFrame } from '../../components/site-shell';
import { aggregateProduction, getDemoData } from '@/lib/demo-data';

export default async function Demo() {
  const data = await getDemoData();
  if (!data) return <PageFrame><main className="section section-light"><div className="container demo-empty"><div className="eyebrow">Demo Lab</div><h1>Demo unavailable</h1><p className="muted">The demonstration environment is not configured.</p><Link href="/contact" className="button button-dark">Request a walkthrough ↗</Link></div></main></PageFrame>;
  const k = aggregateProduction(data.production);
  const high = data.maintenance.filter((x:any)=>['HIGH','CRITICAL'].includes(x.severity));
  const machineRunning = data.machines.filter((m:any)=>m.status === 'RUNNING').length;
  return <PageFrame><main className="demo-shell section-light">
    <section className="demo-hero"><div className="container">
      <div className="demo-breadcrumb"><Link href="/">Corporate</Link><span>/</span><span>Demo Lab</span></div>
      <div className="demo-hero-grid"><div><div className="eyebrow">Product demonstration · synthetic plant data</div><h1>See the layer<br/><span>between data and action.</span></h1><p>Explore how fragmented plant information becomes operational context, signals and recommended next actions.</p><div className="demo-actions"><Link href="/contact" className="button button-green">Request a walkthrough ↗</Link><Link href="/solutions" className="button button-dark">View solutions</Link></div></div>
      <div className="demo-system"><div className="system-core"><span>PLANT</span><strong>→</strong><span>ACTION</span></div><div className="system-node n1">PRODUCTION</div><div className="system-node n2">MAINTENANCE</div><div className="system-node n3">QHSE</div><div className="system-node n4">DATA</div></div></div>
    </div></section>
    <section className="demo-kpis"><div className="container demo-kpi-grid">{[['OEE',`${k.oee.toFixed(1)}%`,'Production efficiency'],['DOWNTIME',`${Math.floor(k.downtime/60)}h ${k.downtime%60}m`,'Recorded loss time'],['MACHINES',`${machineRunning}/${data.machines.length}`,'Machines running'],['HIGH SIGNALS',String(high.length),'Priority incidents']].map(([label,value,desc])=><div className="demo-kpi" key={label}><div className="eyebrow">{label}</div><strong>{value}</strong><span>{desc}</span></div>)}</div></section>
    <section className="demo-navigation"><div className="container"><div className="section-head"><div><div className="eyebrow">Explore the system</div><h2>Follow one operational signal.</h2></div><p>Each surface shows a different part of the same intelligence layer.</p></div><div className="demo-module-grid">
      {[['01','Production','Targets, output, good units and downtime by line.','/demo/production','Inspect production →'],['02','Maintenance','Incident narratives, recurring patterns and AI-assisted interpretation.','/demo/maintenance','Inspect maintenance →'],['03','QHSE','Safety and quality events with status and corrective-action context.','/demo/qhse','Inspect QHSE →'],['04','Data flow','The controlled path from source systems to action.','/demo/data','Inspect data flow →']].map(([n,title,desc,href,cta])=><Link href={href} className="demo-module" key={n}><span className="module-no">{n}</span><div><h3>{title}</h3><p>{desc}</p></div><span className="module-cta">{cta}</span></Link>)}
    </div></div></section>
    <section className="demo-insight"><div className="container demo-insight-grid"><div><div className="eyebrow">Current signal</div><h2>{high[0] ? `${high[0].machine_code} · ${high[0].category ?? high[0].incident_type}` : 'No priority incident'}</h2><p>{high[0] ? `${high[0].duration_minutes} minutes of downtime · ${high[0].severity} severity.` : 'The current synthetic plant has no high-severity maintenance signal.'}</p></div><div className="demo-insight-card"><span>INTERPRETATION</span><strong>{high[0]?.machine_code === 'M-04' ? 'Recurring hydraulic signal on M-04.' : 'Correlate the current event with machine history.'}</strong><Link href="/demo/maintenance">Open maintenance intelligence →</Link></div></div></section>
    <section className="demo-boundary"><div className="container"><div className="eyebrow inverse">Engineering boundary</div><h2>Intelligence before control.</h2><p>The demonstration focuses on information, reasoning and human-reviewed action. It does not directly control PLCs or safety-critical equipment.</p><Link href="/demo/data" className="text-link light">See the reference data flow →</Link></div></section>
  </main></PageFrame>;
}
