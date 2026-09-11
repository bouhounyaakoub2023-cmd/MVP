import { NextResponse } from 'next/server';
import { extractIncident } from '@/lib/incident-intelligence';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function POST(request: Request){
  const secret=process.env.N8N_INGEST_SECRET;
  if(secret && request.headers.get('x-ingest-secret')!==secret) return NextResponse.json({error:'Unauthorized'},{status:401});
  try{
    const body=await request.json(); const text=String(body.text??body.description??'').trim();
    if(text.length<5) return NextResponse.json({error:'text is required'},{status:400});
    const extraction=await extractIncident(text); const supabase=getSupabaseServer(); if(!supabase) return NextResponse.json({error:'Database is not configured'},{status:503});
    const {data:plant}=await supabase.from('industrial_plants').select('id').eq('name','Plant A').maybeSingle();
    const {data:machine}=extraction.machine_code?await supabase.from('machines').select('id').eq('code',extraction.machine_code).maybeSingle():{data:null};
    if(!plant) return NextResponse.json({error:'Demo plant not found'},{status:500});
    const {data:incident,error}=await supabase.from('maintenance_incidents').insert({plant_id:plant.id,machine_id:machine?.id??null,incident_type:extraction.incident_type,category:extraction.category,description:extraction.description,duration_minutes:extraction.duration_minutes,severity:extraction.severity,requires_follow_up:extraction.requires_follow_up,source_text:text,ai_confidence:extraction.confidence,ai_model:extraction.model,review_status:extraction.confidence>=0.8?'AUTO_ACCEPTED':'NEEDS_REVIEW'}).select('id').single();
    if(error) return NextResponse.json({error:error.message},{status:500});
    if(['HIGH','CRITICAL'].includes(extraction.severity)) await supabase.from('alerts').insert({plant_id:plant.id,machine_id:machine?.id??null,severity:extraction.severity,title:`${extraction.severity}: ${extraction.incident_type}`,message:`${extraction.machine_code??'Unknown machine'} · ${extraction.category} · ${extraction.duration_minutes} min downtime`});
    return NextResponse.json({ok:true,incident_id:incident.id,extraction});
  }catch{return NextResponse.json({error:'Invalid webhook payload'},{status:400})}
}
