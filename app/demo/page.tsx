import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabase-server';

export default async function Demo() {
  const supabase = getSupabaseServer();
  const [{data:machines},{data:maintenance},{data:production}] = supabase ? await Promise.all([
    supabase.from('demo_machines').select('*').order('code'),
    supabase.from('demo_maintenance').select('*').order('occurred_at',{ascending:false}),
    supabase.from('demo_production').select('*'),
  ]) : [{data:[]},{data:[]},{data:[]}];
  const rows=production??[]; const produced=rows.reduce((s,r)=>s+Number(r.produced_units||0),0); const target=rows.reduce((s,r)=>s+Number(r.target_units||0),0); const good=rows.reduce((s,r)=>s+Number(r.good_units||0),0); const planned=rows.reduce((s,r)=>s+Number(r.planned_minutes||0),0); const down=rows.reduce((s,r)=>s+Number(r.downtime_minutes||0),0); const oee=planned&&target&&produced?(planned-down)/planned*produced/target*good/produced*100:0;
  return <main className="section section-light" style={{minHeight:'100vh'}}><div className="container">
    <div className="eyebrow">Demo Lab / Plant A</div><h1 style={{fontSize:48,margin:'12px 0 8px',letterSpacing:'-.04em'}}>OPERATIONS INTELLIGENCE</h1><p className="muted">Live synthetic state · Demo Manufacturing Algeria</p>
    <div className="grid" style={{marginTop:35}}>{[['OEE',`${oee.toFixed(1)}%`],['DOWNTIME',`${Math.floor(down/60)}h ${down%60}m`],['INCIDENTS',maintenance?.length??0]].map(x=><div className="card" key={x[0]}><div className="eyebrow">{x[0]}</div><div style={{fontSize:34,fontWeight:800,marginTop:12}}>{x[1]}</div></div>)}</div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18,marginTop:18}}>
      <section className="card"><div className="eyebrow">Plant topology</div><h2>Machine state and relationships</h2><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginTop:30}}>{(machines??[]).map(m=><div key={m.code} style={{padding:18,border:'1px solid #d7d8d4',borderRadius:12}}><div style={{fontWeight:800}}>{m.code}</div><div className={m.status==='RUNNING'?'green':'signal'} style={{fontSize:12,fontWeight:800,marginTop:8}}>{m.status}</div><div className="muted" style={{fontSize:13,marginTop:5}}>{m.name}</div></div>)}</div></section>
      <section className="card dark-card"><div className="eyebrow">Incident intelligence</div><h2>M-04 · Hydraulic leak</h2><p style={{color:'#b8791d',fontWeight:800}}>45 min downtime · Severity: HIGH</p><div style={{marginTop:32}}><div className="eyebrow">FACT</div><p>Machine stopped after hydraulic leak.</p><div className="eyebrow" style={{marginTop:25}}>AI INTERPRETATION</div><p>Recurring hydraulic issues are concentrated on M-04 in the current demo dataset.</p><div className="eyebrow" style={{marginTop:25}}>RECOMMENDATION</div><p>Inspect hydraulic circuit and review recent interventions before the next production run.</p></div></section>
    </div>
    <div style={{display:'flex',gap:10,marginTop:20,flexWrap:'wrap'}}><Link className="button button-green" href="/demo/production">PRODUCTION</Link><Link className="button button-dark" href="/demo/maintenance">MAINTENANCE</Link><Link className="button button-dark" href="/demo/qhse">QHSE</Link></div>
  </div></main>
}