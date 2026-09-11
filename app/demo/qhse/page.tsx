import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabase-server';

export default async function QhseDemo() {
  const supabase = getSupabaseServer();
  const { data } = supabase ? await supabase.from('demo_qhse').select('*').order('occurred_at', { ascending: false }) : { data: [] };
  const rows = data ?? [];
  return <main className="section section-light" style={{minHeight:'100vh'}}><div className="container">
    <Link href="/demo" className="eyebrow">← Demo Lab</Link><h1 style={{fontSize:48,margin:'18px 0 8px'}}>QHSE INTELLIGENCE</h1><p className="muted">Safety and quality signals structured for follow-up.</p>
    <div className="grid" style={{marginTop:32}}>{[['EVENTS',rows.length],['OPEN',rows.filter(r=>r.status==='OPEN').length],['IN PROGRESS',rows.filter(r=>r.status==='IN_PROGRESS').length]].map(([a,b])=><div className="card" key={a}><div className="eyebrow">{a}</div><div style={{fontSize:32,fontWeight:800,marginTop:10}}>{b}</div></div>)}</div>
    <section className="card" style={{marginTop:18}}><div className="eyebrow">Event intelligence</div>{rows.map(r=><article key={r.id} style={{padding:'18px 0',borderBottom:'1px solid #d7d8d4'}}><div style={{display:'flex',justifyContent:'space-between'}}><strong>{r.event_type}</strong><span className={r.severity==='HIGH'?'signal':'muted'}>{r.severity} · {r.status}</span></div><p style={{marginTop:8}}>{r.description}</p><p className="muted" style={{marginTop:5}}>Corrective action: {r.corrective_action || 'Not assigned'}</p></article>)}</section>
  </div></main>;
}
