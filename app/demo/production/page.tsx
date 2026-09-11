import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabase-server';

export default async function ProductionDemo() {
  const supabase = getSupabaseServer();
  const { data } = supabase ? await supabase.from('demo_production').select('*').order('line_code') : { data: [] };
  const rows = data ?? [];
  const produced = rows.reduce((s, r) => s + Number(r.produced_units || 0), 0);
  const target = rows.reduce((s, r) => s + Number(r.target_units || 0), 0);
  const good = rows.reduce((s, r) => s + Number(r.good_units || 0), 0);
  const downtime = rows.reduce((s, r) => s + Number(r.downtime_minutes || 0), 0);
  return <main className="section section-light" style={{minHeight:'100vh'}}><div className="container">
    <Link href="/demo" className="eyebrow">← Demo Lab</Link><h1 style={{fontSize:48,margin:'18px 0 8px'}}>PRODUCTION INTELLIGENCE</h1><p className="muted">KPI layer calculated from the synthetic plant dataset.</p>
    <div className="grid" style={{marginTop:32}}>{[['OUTPUT',produced.toLocaleString()],['TARGET',target.toLocaleString()],['GOOD UNITS',good.toLocaleString()],['DOWNTIME',`${downtime} min`]].map(([a,b])=><div className="card" key={a}><div className="eyebrow">{a}</div><div style={{fontSize:32,fontWeight:800,marginTop:10}}>{b}</div></div>)}</div>
    <section className="card" style={{marginTop:18}}><div className="eyebrow">Line performance</div><div style={{marginTop:20}}>{rows.map(r=><div key={r.id} style={{display:'grid',gridTemplateColumns:'1.2fr .7fr .7fr .7fr',gap:12,padding:'15px 0',borderBottom:'1px solid #d7d8d4'}}><strong>{r.line_code} · {r.line_name}</strong><span>{r.produced_units} units</span><span>{Math.round((r.produced_units/r.target_units)*100)}% target</span><span>{r.downtime_minutes} min down</span></div>)}</div></section>
  </div></main>;
}
