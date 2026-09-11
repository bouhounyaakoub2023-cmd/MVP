const machines = [
  {id:'M-01',name:'Press Station 01',status:'RUNNING',tone:'green'},
  {id:'M-02',name:'Assembly Robot 02',status:'RUNNING',tone:'green'},
  {id:'M-03',name:'CNC Station 03',status:'WARNING',tone:'signal'},
  {id:'M-04',name:'Hydraulic Press 04',status:'STOPPED',tone:'signal'},
];

export default function Demo() {
  return <main className="section section-light" style={{minHeight:'100vh'}}><div className="container">
    <div className="eyebrow">Demo Lab / Plant A</div><h1 style={{fontSize:48,margin:'12px 0 8px',letterSpacing:'-.04em'}}>OPERATIONS INTELLIGENCE</h1><p className="muted">Synthetic plant state · Demo Manufacturing Algeria</p>
    <div className="grid" style={{marginTop:35}}>{[['OEE','78.4%'],['DOWNTIME','4h 18m'],['INCIDENTS','12']].map(x=><div className="card" key={x[0]}><div className="eyebrow">{x[0]}</div><div style={{fontSize:34,fontWeight:800,marginTop:12}}>{x[1]}</div></div>)}</div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18,marginTop:18}}>
      <section className="card"><div className="eyebrow">Plant topology</div><h2>Machine state and relationships</h2><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginTop:30}}>{machines.map(m=><div key={m.id} style={{padding:18,border:'1px solid #d7d8d4',borderRadius:12}}><div style={{fontWeight:800}}>{m.id}</div><div className={m.tone==='green'?'green':'signal'} style={{fontSize:12,fontWeight:800,marginTop:8}}>{m.status}</div><div className="muted" style={{fontSize:13,marginTop:5}}>{m.name}</div></div>)}</div></section>
      <section className="card dark-card"><div className="eyebrow">Incident intelligence</div><h2>M-04 · Hydraulic leak</h2><p style={{color:'#b8791d',fontWeight:800}}>45 min downtime · Severity: HIGH</p><div style={{marginTop:32}}><div className="eyebrow">FACT</div><p>Machine stopped after hydraulic leak.</p><div className="eyebrow" style={{marginTop:25}}>AI INTERPRETATION</div><p>Recurring hydraulic issues are concentrated on M-04 in the current demo dataset.</p><div className="eyebrow" style={{marginTop:25}}>RECOMMENDATION</div><p>Inspect hydraulic circuit and review recent interventions before the next production run.</p></div></section>
    </div>
  </div></main>
}