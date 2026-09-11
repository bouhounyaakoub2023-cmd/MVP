'use client';
import { FormEvent, useState } from 'react';

export default function Contact(){
  const [sent,setSent]=useState(false); const [error,setError]=useState(''); const [loading,setLoading]=useState(false);
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault(); setLoading(true); setError('');
    const f=new FormData(e.currentTarget);
    const res=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(f.entries()))});
    if(res.ok){setSent(true)} else {const data=await res.json().catch(()=>({}));setError(data.error||'Something went wrong. Please try again.')}
    setLoading(false);
  }
  return <main className="section section-light" style={{minHeight:'100vh'}}><div className="container" style={{maxWidth:900}}><div className="eyebrow">Request a pilot</div><h1 style={{fontSize:58,letterSpacing:'-.04em',margin:'12px 0 15px'}}>Bring us one operational workflow.</h1><p className="muted" style={{fontSize:18}}>We start with a concrete process — reporting, incidents, QHSE or industrial data — then build a measurable pilot.</p>{sent?<div className="card" style={{marginTop:35}}><h2>Request received.</h2><p>We have captured your operational context. The next step is a focused technical conversation.</p></div>:<form onSubmit={submit} style={{display:'grid',gap:14,marginTop:35}}>{[['name','Name'],['company','Company'],['role','Role'],['email','Work email'],['plantLocation','Plant / location']].map(([n,x],i)=><input key={n} name={n} required={i<4} type={n==='email'?'email':'text'} placeholder={x} style={{padding:16,border:'1px solid #c8cbc7',borderRadius:10,background:'#fff'}}/>)}<textarea name="challenge" required placeholder="Main operational challenge" rows={5} style={{padding:16,border:'1px solid #c8cbc7',borderRadius:10,background:'#fff'}}/><textarea name="currentTools" placeholder="Current tools (Excel, ERP, GMAO, etc.)" rows={4} style={{padding:16,border:'1px solid #c8cbc7',borderRadius:10,background:'#fff'}}/>{error&&<p className="signal">{error}</p>}<button disabled={loading} className="button button-green" type="submit" style={{justifySelf:'start'}}>{loading?'SUBMITTING…':'SUBMIT PILOT REQUEST'}</button></form>}</div></main>}
