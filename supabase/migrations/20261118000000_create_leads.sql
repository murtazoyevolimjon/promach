-- ============================================================
--  PROMACH — forma so'rovlari (leads) jadvali
--  Supabase → SQL Editor ga nusxalab "Run" bosing
--  (yoki Supabase CLI: `supabase db push`).
-- ============================================================

create table if not exists public.leads (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 2 and 80),
  phone       text not null check (char_length(phone) between 9 and 20),
  product     text check (char_length(product) <= 120),
  comment     text check (char_length(comment) <= 1000),
  lang        text not null default 'uz' check (lang in ('uz', 'ru')),
  page        text check (char_length(page) <= 300),
  -- Menejer uchun: so'rov holati (Supabase Table Editor'da qo'lda o'zgartiriladi)
  status      text not null default 'new' check (status in ('new', 'contacted', 'done', 'spam'))
);

comment on table public.leads is 'promach.uz saytidagi "Narxni so''rash" formasidan kelgan so''rovlar';

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- ------------------------------------------------------------
--  XAVFSIZLIK
--  RLS yoqiladi va HECH QANDAY ochiq policy yaratilmaydi:
--  publishable/anon kalit bilan na o'qib, na yozib bo'ladi.
--  Yozish faqat Vercel serveridagi /api/lead orqali, secret (service_role) kalit bilan,
--  u esa faqat serverda saqlanadi.
-- ------------------------------------------------------------
alter table public.leads enable row level security;

revoke all on table public.leads from anon, authenticated;
