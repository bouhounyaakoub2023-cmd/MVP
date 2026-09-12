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
  const reportStatus = rows.length ? 'READY FOR REVIEW' : 'NO DATA';
  const reportSummary = rows.length
    ? `${targetAttainment}% of planned output achieved across ${rows.length} production lines, with ${downtime} minutes of recorded downtime. ${exceptions.length} line-level exception${exceptions.length === 1 ? '' : 's'} require attention.`
    : 'No production records are available for this reporting period.';

  return <PageFrame><main className="demo-subpage section-light"><div className="container">
    <div className="demo-subnav"><Link href="/demo">← Demo Lab</Link><span>Production intelligence</span></div>
    <div className="subpage-heading"><div className="eyebrow">01 / Production · Automated reporting</div><h1>Turn the shift data<br/><span>into a management brief.</span></h1><p>The reporting workflow takes structured production inputs, calculates KPIs, flags exceptions and produces a review-ready management summary. The same output can be connected to a scheduled delivery workflow.</p></div>

    <section className="card reporting-pipeline">
      <div className="eyebrow">REPORTING PIPELINE</div>
      <div className="reporting-steps">
        {['INPUT · PRODUCTION RECORDS','CALCULATE · KPI ENGINE','DETECT · EXCEPTIONS','GENERATE · MANAGEMENT BRIEF'].map((step,i)=><div className="reporting-step" key={step}><span>0{i+1}</span><strong>{step}</strong>{i < 3 && <b>→</b>}</div>)}
      </div>
    </section>

    <div className="grid" style={{marginTop:18}}>{[['OUTPUT',produced.toLocaleString(),'units produced'],['TARGET ATTAINMENT',`${targetAttainment}%`,'planned output reached'],['QUALITY',`${quality}%`,'good units / output'],['DOWNTIME',`${downtime} min`,'recorded loss time']].map(([a,b,c])=><div className="card" key={a}><div className="eyebrow">{a}</div><strong className="metric-number">{b}</strong><span className="metric-label">{c}</span></div>)}</div>

    <section className="card data-table-card"><div className="eyebrow">Line performance · calculated from source records</div><div className="data-table">{rows.map(r=>{const attainment=Number(r.target_units)?Math.round(Number(r.produced_units)/Number(r.target_units)*100):0; const isException=attainment<90||Number(r.downtime_minutes||0)>=60; return <div className="data-row" key={r.id}><strong>{r.line_code} · {r.line_name}</strong><span>{r.produced_units} units</span><span>{attainment}% target</span><span className={isException?'signal':''}>{r.downtime_minutes} min down{isException?' · EXCEPTION':''}</span></div>})}</div></section>

    <section className="card report-output"><div className="report-output-head"><div><div className="eyebrow">03 / Management output</div><h2>Daily production brief</h2></div><span className="report-status">{reportStatus}</span></div><div className="report-summary"><strong>Executive summary</strong><p>{reportSummary}</p></div><div className="report-exceptions"><div className="eyebrow">Exceptions detected</div>{exceptions.length ? exceptions.map(r=>{const attainment=Number(r.target_units)?Math.round(Number(r.produced_units)/Number(r.target_units)*100):0; return <div className="report-exception" key={r.id}><strong>{r.line_code} · {r.line_name}</strong><span>{attainment}% target · {r.downtime_minutes} min downtime</span></div>}) : <p>No threshold exceptions detected.</p>}</div><div className="report-delivery"><span>DELIVERY</span><strong>Ready for scheduled workflow</strong><small>Output can be passed to an automation workflow for email, document or dashboard delivery.</small></div></section>

    <div className="subpage-next"><Link href="/demo/maintenance">Next: Maintenance intelligence →</Link></div>
  </div></main></PageFrame>;
}
