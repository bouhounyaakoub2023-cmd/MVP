# Industrial Intelligence Platform

Industrial AI / automation platform focused on operational reporting, incident intelligence and industrial data orchestration.

## Current architecture

- **Next.js + TypeScript** — public website, Demo Lab and API routes
- **Supabase / PostgreSQL** — industrial operational data and RLS
- **AI abstraction** — provider-backed structured extraction when `OPENROUTER_API_KEY` is configured, deterministic fallback otherwise
- **n8n boundary** — `/api/webhooks/maintenance` accepts normalized maintenance events from an orchestration workflow
- **Resend boundary** — ready for transactional notifications once a verified sending domain is configured

## Demo Lab

- `/demo` — plant overview
- `/demo/production` — production KPIs
- `/demo/maintenance` — maintenance intelligence + live incident extraction
- `/demo/qhse` — QHSE event intelligence
- `/demo/data` — industrial data architecture

All public demo records are synthetic and belong to `Demo Manufacturing Algeria`.

## Environment

Copy `.env.example` to `.env.local` and configure the Supabase project URL and publishable key. Keep AI and webhook secrets server-side.

## Industrial workflow

`Source → Ingest → Validate → Normalize → Store → AI/Rules → Insight → Action`

The AI layer is not the system of record and the initial platform does not directly control PLCs or safety-critical equipment.
