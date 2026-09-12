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
  const targetAttainment = target ? Math.round((produced / target) * 100) : 0;
  const quality = produced ? Math.round((good / produced) * 100) : 0;
  const exceptions = rows.filter(r => {
    const attainment = Number(r.target_units) ? Number(r.produced_units) / Number(r.target_units) * 100 : 100;
    return attainment < 90 || Number(r.downtime_minutes || 0) >= 60;
  });
  const reportSummary = rows.length
    ? `${targetAttainment}% of planned output achieved across ${rows.length} production lines, with ${downtime} minutes of recorded downtime. ${exceptions.length} line-level exception${exceptions.length === 1 ? '' : 's'} require attention.`
    : 'No production records are available for this reporting period.';

  return <PageFrame><main className="demo-subpage section-light"><div className="container">
    <div className="demo-subnav"><Link href="/demo">← Demo Lab</Link><span>Production intelligence</span></div>
    <div className="subpage-heading"><div className="eyebrow">01 / Production · Automated reporting</div><h1>Turn the shift data<br/><span>into a management brief.</span></h1><p>The workflow takes structured production inputs, calculates KPIs, flags exceptions and produces a review-ready management summary. Its output is ready to connect to a scheduled delivery workflow.</p></div>

    <section className="card" style={{marginTop:18}}>
      <div className="eyebrow">REPORTING PIPELINE</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0,marginTop:24}}>
        {['INPUT · PRODUCTION RECORDS','CALCULATE · KPI ENGINE','DETECT · EXCEPTIONS','GENERATE · MANAGEMENT BRIEF'].map((step,i)=><div key={step} style={{position:'relative',padding:'18px 22px 18px 0',borderTop:'1px solid #d7d8d4'}}><span style={{display:'block',font:'10px "DM Mono",monospace',color:'#737c7c',marginBottom:10}}>0{i+1}</span><strong style={{fontSize:11,letterSpacing:'.06em'}}>{step}</strong>{i < 3 && <b style={{position:'absolute',right:14,top:42,color:'#8a9450'}}>→</b>}</div>)}
      </div>
    </section>

    <div className="grid" style={{marginTop:18}}>{[['OUTPUT',produced.toLocaleString(),'units produced'],['TARGET ATTAINMENT',`${targetAttainment}%`,'planned output reached'],['QUALITY',`${quality}%`,'good units / output'],['DOWNTIME',`${downtime} min`,'recorded loss time']].map(([a,b,c])=><div className="card" key={a}><div className="eyebrow">{a}</div><strong className="metric-number">{b}</strong><span className="metric-label">{c}</span></div>)}</div>

    <section className="card data-table-card"><div className="eyebrow">Line performance · calculated from source records</div><div className="data-table">{rows.map(r=>{const attainment=Number(r.target_units)?Math.round(Number(r.produced_units)/Number(r.target_units)*100):0; const isException=attainment<90||Number(r.downtime_minutes||0)>=60; return <div className="data-row" key={r.id}><strong>{r.line_code} · {r.line_name}</strong><span>{r.produced_units} units</span><span>{attainment}% target</span><span className={isException?'signal':''}>{r.downtime_minutes} min down{isException?' · EXCEPTION':''}</span></div>})}</div></section>

    <section className="card dark-card" style={{marginTop:18,padding:34}}>
      <div style={{display:'flex',justifyContent:'space-between',gap:20,alignItems:'start',flexWrap:'wrap'}}><div><div className="eyebrow inverse">03 / MANAGEMENT OUTPUT</div><h2 style={{fontSize:38,letterSpacing:'-.04em',margin:'12px 0'}}>Daily production brief</h2></div><span style={{font:'9px "DM Mono",monospace',border:'1px solid #3d8a61',padding:'8px 10px',color:'#8cc49e'}}>READY FOR REVIEW</span></div>
      <div style={{marginTop:24,paddingTop:22,borderTop:'1px solid rgba(255,255,255,.12)'}}><div className="eyebrow inverse">EXECUTIVE SUMMARY</div><p style={{maxWidth:760,color:'#aab3b1',lineHeight:1.6,margin:'10px 0 0'}}>{reportSummary}</p></div>
      <div style={{marginTop:26}}><div className="eyebrow inverse">EXCEPTIONS DETECTED</div>{exceptions.length ? exceptions.map(r=>{const attainment=Number(r.target_units)?Math.round(Number(r.produced_units)/Number(r.target_units)*100):0; return <div key={r.id} style={{display:'flex',justifyContent:'space-between',gap:20,padding:'14px 0',borderBottom:'1px solid rgba(255,255,255,.1)',color:'#f4f1e8',fontSize:13}}><strong>{r.line_code} · {r.line_name}</strong><span style={{color:'#d9cfa1'}}>{attainment}% target · {r.downtime_minutes} min downtime</span></div>}) : <p style={{color:'#aab3b1'}}>No threshold exceptions detected.</p>}</div>
      <div style={{marginTop:26,paddingTop:20,borderTop:'1px solid rgba(255,255,255,.12)',display:'grid',gridTemplateColumns:'120px 1fr',gap:15}}><span className="eyebrow inverse">DELIVERY</span><div><strong>Ready for scheduled workflow</strong><small style={{display:'block',color:'#899393',marginTop:6,lineHeight:1.5}}>The report output can be passed to an automation workflow for email, document or dashboard delivery.</small></div></div>
    </section>

    <div className="subpage-next"><Link href="/demo/maintenance">Next: Maintenance intelligence →</Link></div>
  </div></main></PageFrame>;
}
