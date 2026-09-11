import Link from 'next/link';
import { PageFrame } from '../../../components/site-shell';
import { getSupabaseServer } from '@/lib/supabase-server';

export default async function ProductionDemo() {
  const supabase = getSupabaseServer();
  const { data } = supabase ? await supabase.from('demo_production').select('*').order('line_code') : { data: [] };
  const rows = data ?? [];
  const produced = rows.reduce((s, r) => s + Number(r.produced_units || 0), 0);
  const target = rows.reduce((s, r) => s + Number(r.target_units || 0), 0);
  const good = rows.reduce((s, r) => s + Number(r.good_units || 0), 0);
  const downtime = rows.reduce((s, r) => s + Number(r.downtime_minutes || 0), 0);
  return <PageFrame><main className="demo-subpage section-light"><div className="container">
    <div className="demo-subnav"><Link href="/demo">← Demo Lab</Link><span>Production intelligence</span></div>
    <div className="subpage-heading"><div className="eyebrow">01 / Production</div><h1>What the lines<br/><span>are telling us.</span></h1><p>KPI calculations from the synthetic plant dataset. The same layer can consume structured records from existing operational systems.</p></div>
    <div className="grid" style={{marginTop:42}}>{[['OUTPUT',produced.toLocaleString(),'units produced'],['TARGET',target.toLocaleString(),'planned units'],['GOOD UNITS',good.toLocaleString(),'accepted units'],['DOWNTIME',`${downtime} min`,'recorded loss time']].map(([a,b,c])=><div className="card" key={a}><div className="eyebrow">{a}</div><strong className="metric-number">{b}</strong><span className="metric-label">{c}</span></div>)}</div>
    <section className="card data-table-card"><div className="eyebrow">Line performance</div><div className="data-table">{rows.map(r=><div className="data-row" key={r.id}><strong>{r.line_code} · {r.line_name}</strong><span>{r.produced_units} units</span><span>{Math.round((Number(r.produced_units)/Math.max(1,Number(r.target_units)))*100)}% target</span><span>{r.downtime_minutes} min down</span></div>)}</div></section>
    <div className="subpage-next"><Link href="/demo/maintenance">Next: Maintenance intelligence →</Link></div>
  </div></main></PageFrame>;
}
