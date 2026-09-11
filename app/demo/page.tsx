import Link from 'next/link';
import { aggregateProduction, getDemoData } from '@/lib/demo-data';

export default async function Demo() {
  const data = await getDemoData();
  if (!data) return <main className="section section-light"><div className="container"><h1>Demo unavailable</h1><p className="muted">Supabase environment variables are not configured.</p></div></main>;
  const k = aggregateProduction(data.production);
  const high = data.maintenance.filter((x:any)=>['HIGH','CRITICAL'].includes(x.severity));
  return <main className="section section-light" style={{minHeight:'100vh'}}><div className="container">
    <div className="eyebrow">Demo Lab / {data.plant?.name ?? 'Plant A'}</div><h1 style={{fontSize:48,margin:'12px 0 8px',letterSpacing:'-.04em'}}>OPERATIONS INTELLIGENCE</h1><p className="muted">Synthetic plant state · {data.company?.name}</p>
    <nav style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:22}}>{[['Production','/demo/production'],['Maintenance','/demo/maintenance'],['QHSE','/demo/qhse'],['Data flow','/demo/data']].map(([label,href])=><Link key={href} href={href} className="button button-dark">{label}</Link>)}</nav>
    <div className="grid" style={{marginTop:35}}>{[['OEE',`${k.oee.toFixed(1)}%`],['DOWNTIME',`${Math.floor(k.downtime/60)}h ${k.downtime%60}m`],['INCIDENTS',String(data.maintenance.length)],['HIGH SEVERITY',String(high.length)]].map(x=><div className="card" key={x[0]}><div className="eyebrow">{x[0]}</div><div style={{fontSize:34,fontWeight:800,marginTop:12}}>{x[1]}</div></div>)}</div>
    <div style={{display:'grid',gridTemplateColumns:'1.1fr .9fr',gap:18,marginTop:18}}>
      <section className="card"><div className="eyebrow">Plant topology</div><h2>Machine state</h2><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:24}}>{data.machines.map((m:any)=><div key={m.id} style={{padding:16,border:'1px solid #d7d8d4',borderRadius:12}}><div style={{fontWeight:800}}>{m.code}</div><div className={m.status==='RUNNING'?'green':'signal'} style={{fontSize:12,fontWeight:800,marginTop:7}}>{m.status}</div><div className="muted" style={{fontSize:13,marginTop:5}}>{m.name}</div><div className="muted" style={{fontSize:11,marginTop:8}}>{m.line_code ?? 'Unassigned'}</div></div>)}</div></section>
      <section className="card dark-card"><div className="eyebrow">Incident intelligence</div><h2>{high[0] ? `${high[0].machine_code} · ${high[0].category ?? high[0].incident_type}` : 'No high-severity incident'}</h2>{high[0] && <><p style={{color:'#b8791d',fontWeight:800}}>{high[0].duration_minutes} min downtime · Severity: {high[0].severity}</p><div style={{marginTop:26}}><div className="eyebrow">FACT</div><p>{high[0].description}</p><div className="eyebrow" style={{marginTop:22}}>AI INTERPRETATION</div><p>{high[0].machine_code === 'M-04' ? 'Recurring hydraulic issues are concentrated on M-04 in the current demo dataset.' : 'The event should be correlated with recent machine and production history.'}</p><div className="eyebrow" style={{marginTop:22}}>RECOMMENDATION</div><p>Review the recent intervention history and verify the affected subsystem before the next production run.</p></div></>}</section>
    </div>
  </div></main>;
}
