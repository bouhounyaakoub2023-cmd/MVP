import { NextResponse } from 'next/server';
import { extractIncident } from '@/lib/incident-intelligence';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function POST(request: Request) {
  try {
    const { text, persist } = await request.json();
    if (typeof text !== 'string' || text.trim().length < 5) return NextResponse.json({ error:'Incident text is required.' },{status:400});
    const extraction=await extractIncident(text);
    let incidentId:null|string=null;
    if(persist){
      const supabase=getSupabaseServer();
      if(!supabase) return NextResponse.json({ extraction, warning:'Database is not configured; result was not persisted.' });
      const {data:plant}=await supabase.from('industrial_plants').select('id').eq('name','Plant A').maybeSingle();
      const {data:machine}=extraction.machine_code ? await supabase.from('machines').select('id').eq('code',extraction.machine_code).maybeSingle() : {data:null};
      if(plant){
        const {data,error}=await supabase.from('maintenance_incidents').insert({plant_id:plant.id,machine_id:machine?.id??null,incident_type:extraction.incident_type,category:extraction.category,description:extraction.description,duration_minutes:extraction.duration_minutes,severity:extraction.severity,requires_follow_up:extraction.requires_follow_up,source_text:text,ai_confidence:extraction.confidence,ai_model:extraction.model,review_status:extraction.confidence>=0.8?'AUTO_ACCEPTED':'NEEDS_REVIEW'}).select('id').single();
        if(error) return NextResponse.json({extraction,error:error.message},{status:500});
        incidentId=data.id;
      }
    }
    return NextResponse.json({ extraction, incidentId });
  } catch { return NextResponse.json({error:'Unable to process incident.'},{status:500}); }
}
