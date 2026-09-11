import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function GET() {
  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json({ error: 'Supabase is not configured' }, { status: 503 });

  const [machines, production, maintenance, qhse] = await Promise.all([
    supabase.from('demo_machines').select('*').order('code'),
    supabase.from('demo_production').select('*').order('record_date', { ascending: false }),
    supabase.from('demo_maintenance').select('*').order('occurred_at', { ascending: false }),
    supabase.from('demo_qhse').select('*').order('occurred_at', { ascending: false }),
  ]);

  const error = machines.error || production.error || maintenance.error || qhse.error;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = production.data ?? [];
  const produced = rows.reduce((s, r) => s + Number(r.produced_units || 0), 0);
  const target = rows.reduce((s, r) => s + Number(r.target_units || 0), 0);
  const good = rows.reduce((s, r) => s + Number(r.good_units || 0), 0);
  const planned = rows.reduce((s, r) => s + Number(r.planned_minutes || 0), 0);
  const downtime = rows.reduce((s, r) => s + Number(r.downtime_minutes || 0), 0);
  const availability = planned ? (planned - downtime) / planned : 0;
  const performance = target ? produced / target : 0;
  const quality = produced ? good / produced : 0;
  const oee = availability * performance * quality;

  return NextResponse.json({
    plant: 'Plant A',
    company: 'Demo Manufacturing Algeria',
    kpis: {
      produced, target, downtimeMinutes: downtime,
      availability: Math.round(availability * 1000) / 10,
      performance: Math.round(performance * 1000) / 10,
      quality: Math.round(quality * 1000) / 10,
      oee: Math.round(oee * 1000) / 10,
      incidents: maintenance.data?.length ?? 0,
      qhseEvents: qhse.data?.length ?? 0,
    },
    machines: machines.data ?? [],
    production: rows,
    maintenance: maintenance.data ?? [],
    qhse: qhse.data ?? [],
  });
}
