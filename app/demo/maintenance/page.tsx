import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabase-server';

export default async function MaintenanceDemo() {
  const supabase = getSupabaseServer();
  const { data } = supabase ? await supabase.from('demo_maintenance').select('*').order('occurred_at', { ascending: false }) : { data: [] };
  const rows = data ?? [];
  const hydraulic = rows.filter(r => r.category === 'Hydraulics');
  const downtime = rows.reduce((s, r) => s + Number(r.duration_minutes || 0), 0);
  return <main className="section section-light" style={{minHeight:'100vh'}}><div className="container">
    <Link href="/demo" className="eyebrow">← Demo Lab</Link><h1 style={{fontSize:48,margin:'18px 0 8px'}}>MAINTENANCE INTELLIGENCE</h1><p className="muted">Incident narratives → structured events → patterns → action.</p>
    <div className="grid" style={{marginTop:32}}>{[['INCIDENTS',rows.length],['DOWNTIME',`${downtime} min`],['HYDRAULIC EVENTS',hydraulic.length]].map(([a,b])=><div className="card" key={a}><div className="eyebrow">{a}</div><div style={{fontSize:32,fontWeight:800,marginTop:10}}>{b}</div></div>)}</div>
    <section className="card dark-card" style={{marginTop:18}}><div className="eyebrow">Pattern detected</div><h2 style={{marginTop:10}}>M-04 · recurring hydraulic failure</h2><p style={{marginTop:10}}>Three hydraulic-related incidents are present in the current synthetic history. The signal is concentrated on the same machine.</p><div className="eyebrow" style={{marginTop:28}}>RECOMMENDATION</div><p>Inspect the hydraulic circuit, seals and recent intervention history before the next production run.</p></section>
    <section className="card" style={{marginTop:18}}><div className="eyebrow">Incident stream</div>{rows.map(r=><div key={r.id} style={{padding:'17px 0',borderBottom:'1px solid #d7d8d4'}}><div style={{display:'flex',justifyContent:'space-between',gap:12}}><strong>{r.machine_code} · {r.incident_type}</strong><span className={r.severity==='HIGH'?'signal':'muted'}>{r.severity}</span></div><p className="muted" style={{marginTop:7}}>{r.description} · {r.duration_minutes} min</p></div>)}</section>
  </div></main>;
}
