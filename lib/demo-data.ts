import { getSupabaseServer } from '@/lib/supabase-server';

export async function getDemoData() {
  const supabase = getSupabaseServer();
  if (!supabase) return null;
  const [company, plant, machines, production, maintenance, qhse, alerts] = await Promise.all([
    supabase.from('industrial_companies').select('*').eq('name','Demo Manufacturing Algeria').maybeSingle(),
    supabase.from('industrial_plants').select('*').eq('name','Plant A').maybeSingle(),
    supabase.from('demo_machines').select('*').order('code'),
    supabase.from('demo_production').select('*').order('record_date',{ascending:false}),
    supabase.from('demo_maintenance').select('*').order('occurred_at',{ascending:false}),
    supabase.from('demo_qhse').select('*').order('occurred_at',{ascending:false}),
    supabase.from('alerts').select('*').eq('status','OPEN').order('created_at',{ascending:false}).limit(10),
  ]);
  return { company: company.data, plant: plant.data, machines: machines.data ?? [], production: production.data ?? [], maintenance: maintenance.data ?? [], qhse: qhse.data ?? [], alerts: alerts.data ?? [] };
}

export function aggregateProduction(records: any[]) {
  const planned = records.reduce((s,r)=>s+(r.planned_minutes||0),0);
  const downtime = records.reduce((s,r)=>s+(r.downtime_minutes||0),0);
  const produced = records.reduce((s,r)=>s+(r.produced_units||0),0);
  const target = records.reduce((s,r)=>s+(r.target_units||0),0);
  const good = records.reduce((s,r)=>s+(r.good_units||0),0);
  const availability = planned ? ((planned-downtime)/planned)*100 : 0;
  const performance = target ? (produced/target)*100 : 0;
  const quality = produced ? (good/produced)*100 : 0;
  const oee = availability*(performance/100)*(quality/100);
  return { planned, downtime, produced, target, good, availability, performance, quality, oee };
}
