export type IncidentExtraction = {
  machine_code: string | null;
  incident_type: string;
  category: string;
  duration_minutes: number;
  severity: 'LOW'|'MEDIUM'|'HIGH'|'CRITICAL';
  description: string;
  requires_follow_up: boolean;
  confidence: number;
  model: string;
};

const severity = (text:string): IncidentExtraction['severity'] => {
  const t=text.toLowerCase();
  if (/critical|critique|danger|fire|incendie/.test(t)) return 'CRITICAL';
  if (/high|élevée|elevee|urgent|arrêt|arret|stopped|fuite|leak/.test(t)) return 'HIGH';
  if (/low|faible|mineur/.test(t)) return 'LOW';
  return 'MEDIUM';
};

export function heuristicExtract(text:string): IncidentExtraction {
  const machine = text.match(/\bM[- ]?\d{1,3}\b/i)?.[0]?.toUpperCase().replace(' ','-') ?? null;
  const durationMatch = text.match(/(\d+)\s*(?:min|minutes?|mn)\b/i);
  const duration = durationMatch ? Number(durationMatch[1]) : 0;
  const lower=text.toLowerCase();
  const category = /hydraulic|hydraulique|huile|oil|fuite|leak/.test(lower) ? 'Hydraulics' : /electri|électri|motor|moteur|sensor|capteur/.test(lower) ? 'Electrical / Control' : /quality|qualité|defect|défaut/.test(lower) ? 'Quality' : 'Mechanical / General';
  const incidentType = /fuite|leak/.test(lower) ? 'Leak' : /arrêt|arret|stopped|panne|failure/.test(lower) ? 'Unplanned stop' : 'Maintenance event';
  const sev=severity(text);
  return { machine_code:machine, incident_type:incidentType, category, duration_minutes:duration, severity:sev, description:text.trim(), requires_follow_up:['HIGH','CRITICAL'].includes(sev), confidence: machine && duration ? 0.93 : machine ? 0.82 : 0.64, model:'heuristic-v1' };
}

export async function extractIncident(text:string): Promise<IncidentExtraction> {
  const apiKey=process.env.OPENROUTER_API_KEY;
  if (!apiKey) return heuristicExtract(text);
  try {
    const res=await fetch('https://openrouter.ai/api/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${apiKey}`,'HTTP-Referer':process.env.NEXT_PUBLIC_APP_URL||'http://localhost:3000','X-Title':'Industrial Intelligence'},body:JSON.stringify({model:process.env.OPENROUTER_MODEL||'openai/gpt-4o-mini',temperature:0,response_format:{type:'json_object'},messages:[{role:'system',content:'Extract industrial maintenance incident data. Return only JSON with machine_code, incident_type, category, duration_minutes, severity, description, requires_follow_up, confidence. Never invent a machine code or duration.'},{role:'user',content:text}]})});
    if(!res.ok) return heuristicExtract(text);
    const json=await res.json(); const content=json.choices?.[0]?.message?.content; if(!content) return heuristicExtract(text);
    const parsed=JSON.parse(content); return {...heuristicExtract(text),...parsed,model:process.env.OPENROUTER_MODEL||'openrouter'};
  } catch { return heuristicExtract(text); }
}
