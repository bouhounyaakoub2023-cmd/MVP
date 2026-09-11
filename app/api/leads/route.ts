import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const company = String(body.company ?? '').trim();
    const role = String(body.role ?? '').trim();
    const email = String(body.email ?? '').trim().toLowerCase();
    const plantLocation = String(body.plantLocation ?? '').trim();
    const challenge = String(body.challenge ?? '').trim();
    const currentTools = String(body.currentTools ?? '').trim();

    if (!name || !company || !emailPattern.test(email)) {
      return NextResponse.json({ error: 'Name, company and a valid work email are required.' }, { status: 400 });
    }

    const supabase = getSupabaseServer();
    if (!supabase) return NextResponse.json({ error: 'Database is not configured.' }, { status: 503 });

    const { error } = await supabase.from('leads').insert({
      name, company, role: role || null, email, plant_location: plantLocation || null,
      challenge: challenge || null, current_tools: currentTools || null,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
