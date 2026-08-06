-- 在 Supabase Dashboard 的 SQL Editor 中完整执行本文件。
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '物理学习者',
  created_at timestamptz not null default now()
);
create table if not exists public.attempts (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  selected_answer integer,
  submitted boolean not null default false,
  is_correct boolean,
  updated_at timestamptz not null default now(),
  primary key (user_id, question_id)
);
create table if not exists public.study_plans (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  exam_date date not null,
  current_level text not null,
  target_score integer not null,
  updated_at timestamptz not null default now(),
  unique(user_id)
);
alter table public.profiles enable row level security;
alter table public.attempts enable row level security;
alter table public.study_plans enable row level security;
create policy "profile own data" on public.profiles for all using (auth.uid()=id) with check (auth.uid()=id);
create policy "attempt own data" on public.attempts for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "plan own data" on public.study_plans for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create or replace function public.create_profile_for_new_user() returns trigger language plpgsql security definer set search_path = public as $$ begin insert into public.profiles(id, display_name) values (new.id, coalesce(new.raw_user_meta_data->>'display_name','物理学习者')); return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.create_profile_for_new_user();
