import Link from 'next/link';
import { PageFrame } from '../../../components/site-shell';
import { getSupabaseServer } from '@/lib/supabase-server';

export default async function QhseDemo() {
  const supabase = getSupabaseServer();
  const { data } = supabase ? await supabase.from('demo_qhse').select('*').order('occurred_at', { ascending: false }) : { data: [] };
  const rows = data ?? [];
  return <PageFrame><main className="demo-subpage section-light"><div className="container">
    <div className="demo-subnav"><Link href="/demo">← Demo Lab</Link><span>QHSE intelligence</span></div>
    <div className="subpage-heading"><div className="eyebrow">03 / QHSE</div><h1>Turn events into<br/><span>follow-up.</span></h1><p>Safety and quality signals structured for ownership, status and corrective action — without adding another reporting ritual.</p></div>
    <div className="grid" style={{marginTop:42}}>{[['EVENTS',rows.length,'recorded signals'],['OPEN',rows.filter(r=>r.status==='OPEN').length,'awaiting action'],['IN PROGRESS',rows.filter(r=>r.status==='IN_PROGRESS').length,'being handled']].map(([a,b,c])=><div className="card" key={a}><div className="eyebrow">{a}</div><strong className="metric-number">{b}</strong><span className="metric-label">{c}</span></div>)}</div>
    <section className="card event-stream"><div className="eyebrow">Event intelligence</div>{rows.map(r=><article key={r.id}><div className="event-top"><strong>{r.event_type}</strong><span className={r.severity==='HIGH'?'signal':'muted'}>{r.severity} · {r.status}</span></div><p>{r.description}</p><small>Corrective action · {r.corrective_action || 'Not assigned'}</small></article>)}</section>
    <div className="subpage-next"><Link href="/demo/data">Next: Data flow →</Link></div>
  </div></main></PageFrame>;
}
