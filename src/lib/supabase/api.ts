import type { Booking, Court, Equipment, SlotCell, UserProfile } from "@/lib/types";
import { COURTS, EQUIPMENT, GRID, ME, MY_BOOKINGS } from "@/lib/data";
import { getSupabase, isSupabaseConfigured } from "./client";

function mapCourt(row: { id: number; name: string; type: Court["type"]; indoor: boolean; mode: Court["mode"]; price: number }): Court {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    indoor: row.indoor,
    mode: row.mode,
    price: Number(row.price),
  };
}

function mapEquipment(row: {
  id: string;
  cat: Equipment["cat"];
  name: string;
  tag: string;
  price: number;
  per_day: boolean;
  stock: number;
  blurb: string;
}): Equipment {
  return {
    id: row.id,
    cat: row.cat,
    name: row.name,
    tag: row.tag,
    price: Number(row.price),
    perDay: row.per_day,
    stock: row.stock,
    blurb: row.blurb,
  };
}

export async function fetchCourts(): Promise<Court[]> {
  const sb = getSupabase();
  if (!sb) return COURTS;

  const { data, error } = await sb.from("courts").select("*").order("id");
  if (error || !data?.length) return COURTS;
  return data.map(mapCourt);
}

export async function fetchEquipment(): Promise<Equipment[]> {
  const sb = getSupabase();
  if (!sb) return EQUIPMENT;

  const { data, error } = await sb.from("equipment").select("*");
  if (error || !data?.length) return EQUIPMENT;
  return data.map(mapEquipment);
}

export async function fetchOccupancyGrid(date: string): Promise<Record<number, SlotCell[]> | null> {
  const sb = getSupabase();
  if (!sb) return null;

  const { data, error } = await sb
    .from("slot_occupancy")
    .select("court_id, slot_index, state, booked_by")
    .eq("booking_date", date);
  if (error || !data?.length) return null;

  type OccRow = { court_id: number; slot_index: number; state: SlotCell["state"]; booked_by: string | null };
  const grid: Record<number, SlotCell[]> = {};
  for (const row of data as OccRow[]) {
    if (!grid[row.court_id]) grid[row.court_id] = [];
    grid[row.court_id][row.slot_index] = {
      state: row.state,
      who: row.booked_by ?? undefined,
      slot: row.slot_index,
    };
  }
  return grid;
}

export function getFallbackGrid(): Record<number, SlotCell[]> {
  return GRID;
}

export async function fetchProfile(userId: string): Promise<UserProfile | null> {
  const sb = getSupabase();
  if (!sb) return ME;

  const { data, error } = await sb.from("profiles").select("*").eq("id", userId).maybeSingle();
  if (error || !data) return null;

  const p = data as {
    name: string;
    initials: string;
    member_tier: string;
    since_year: number | null;
    credit: number;
    level: string | null;
  };

  return {
    name: p.name,
    initials: p.initials,
    member: p.member_tier,
    since: p.since_year ? `seit ${p.since_year}` : "—",
    credit: Number(p.credit),
    level: p.level ?? "—",
  };
}

export async function fetchMyBookings(userId: string): Promise<Booking[]> {
  const sb = getSupabase();
  if (!sb) return MY_BOOKINGS;

  const { data, error } = await sb
    .from("bookings")
    .select("*")
    .eq("user_id", userId)
    .order("booking_date", { ascending: true });

  if (error || !data?.length) return MY_BOOKINGS;

  type BookingRow = {
    id: string;
    court_id: number;
    booking_date: string;
    slot_index: number;
    time_label: string;
    players: number;
    gear: string[] | null;
    price: number;
    status: string;
  };

  return (data as BookingRow[]).map((b) => ({
    id: b.id,
    court: b.court_id,
    date: b.booking_date,
    slot: b.slot_index,
    time: b.time_label,
    players: b.players,
    gear: b.gear ?? [],
    price: Number(b.price),
    status: b.status,
  }));
}

export async function signInWithPassword(email: string, password: string) {
  const sb = getSupabase();
  if (!sb) return { ok: true as const, demo: true as const };
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, session: data.session };
}

export async function signUp(email: string, password: string, name: string) {
  const sb = getSupabase();
  if (!sb) return { ok: true as const, demo: true as const };
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const { data, error } = await sb.auth.signUp({
    email,
    password,
    options: { data: { name, initials } },
  });
  if (error) return { ok: false as const, error: error.message };
  if (data.user) {
    await sb.from("profiles").upsert({
      id: data.user.id,
      name,
      initials,
      member_tier: "Mitglied",
      credit: 0,
      level: "—",
    });
  }
  return { ok: true as const, session: data.session };
}

export async function signOut() {
  const sb = getSupabase();
  if (!sb) return;
  await sb.auth.signOut();
}

export { isSupabaseConfigured };
