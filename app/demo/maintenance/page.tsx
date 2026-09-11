import Link from 'next/link';
import { PageFrame } from '../../../components/site-shell';
import { getSupabaseServer } from '@/lib/supabase-server';
import IncidentAnalyzer from './IncidentAnalyzer';

export default async function MaintenanceDemo() {
  const supabase = getSupabaseServer();
  const { data } = supabase ? await supabase.from('demo_maintenance').select('*').order('occurred_at',{ascending:false}) : {data:[]};
  const rows=data??[]; const hydraulic=rows.filter(r=>r.category==='Hydraulics'); const downtime=rows.reduce((s,r)=>s+Number(r.duration_minutes||0),0);
  return <PageFrame><main className="demo-subpage section-light"><div className="container">
    <div className="demo-subnav"><Link href="/demo">← Demo Lab</Link><span>Maintenance intelligence</span></div>
    <div className="subpage-heading"><div className="eyebrow">02 / Maintenance</div><h1>Don't just log<br/><span>the failure.</span></h1><p>Structure the incident, expose recurrence and give the maintenance team a defensible next action.</p></div>
    <div className="grid" style={{marginTop:42}}>{[['INCIDENTS',rows.length,'recorded events'],['DOWNTIME',`${downtime} min`,'recorded loss time'],['HYDRAULIC EVENTS',hydraulic.length,'same-category signals']].map(([a,b,c])=><div className="card" key={a}><div className="eyebrow">{a}</div><strong className="metric-number">{b}</strong><span className="metric-label">{c}</span></div>)}</div>
    <section className="card dark-card pattern-card"><div className="eyebrow">Pattern detected</div><h2>M-04 · recurring hydraulic failure</h2><p>Three hydraulic-related incidents are present in the current synthetic history. The signal is concentrated on the same machine.</p><div className="pattern-action"><div><span className="eyebrow">RECOMMENDATION</span><strong>Inspect the hydraulic circuit, seals and recent intervention history before the next production run.</strong></div><span className="pattern-badge">REVIEW</span></div></section>
    <IncidentAnalyzer />
    <section className="card event-stream"><div className="eyebrow">Incident stream</div>{rows.map(r=><article key={r.id}><div className="event-top"><strong>{r.machine_code} · {r.incident_type}</strong><span className={r.severity==='HIGH'||r.severity==='CRITICAL'?'signal':'muted'}>{r.severity}</span></div><p>{r.description} · {r.duration_minutes} min</p></article>)}</section>
    <div className="subpage-next"><Link href="/demo/qhse">Next: QHSE intelligence →</Link></div>
  </div></main></PageFrame>;
}
