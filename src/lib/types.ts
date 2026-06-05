export type CourtType = "panorama" | "indoor" | "outdoor";
export type CourtMode = "Doppel" | "Einzel";
export type SlotState = "free" | "booked" | "mine";
export type EquipmentCategory = "racket" | "ball" | "shoe" | "extra";
export type Role = "player" | "admin";
export type Lang = "de" | "en";
export type Theme = "dark" | "light";
export type AccentKey = "brass" | "clay" | "green" | "slate";
export type FontKey = "classic" | "editorial" | "modern";
export type DensityKey = "compact" | "regular" | "comfy";

export interface Court {
  id: number;
  name: string;
  type: CourtType;
  indoor: boolean;
  mode: CourtMode;
  price: number;
}

export interface SlotCell {
  state: SlotState;
  who?: string;
  slot: number;
}

export interface Equipment {
  id: string;
  cat: EquipmentCategory;
  name: string;
  tag: string;
  price: number;
  perDay: boolean;
  stock: number;
  blurb: string;
}

export interface Booking {
  id: string;
  court: number;
  date: string;
  slot: number;
  time: string;
  players: number;
  gear: string[];
  price: number;
  status: string;
}

export interface WeekDay {
  d: string;
  court: number;
  gear: number;
}

export interface FeedItem {
  who: string;
  act: string;
  amt: number;
  ago: string;
  gear: boolean;
}

export interface UserProfile {
  name: string;
  initials: string;
  member: string;
  since: string;
  credit: number;
  level: string;
}

export type Cart = Record<string, number>;

export interface BookingSheetState {
  open: boolean;
  court: Court | null;
  slot: number;
}

export type PlayerView = "home" | "equipment" | "account";
export type AdminView = "overview" | "bookings" | "courts";
export type AppView = PlayerView | AdminView;
