import type {
  Court,
  Equipment,
  FeedItem,
  SlotCell,
  UserProfile,
  WeekDay,
  Booking,
} from "./types";

export const HOURS = [
  "08:00",
  "09:30",
  "11:00",
  "12:30",
  "14:00",
  "15:30",
  "17:00",
  "18:30",
  "20:00",
  "21:30",
];

export const COURTS: Court[] = [
  { id: 1, name: "Center", type: "panorama", indoor: false, mode: "Doppel", price: 32 },
  { id: 2, name: "Glashaus", type: "panorama", indoor: true, mode: "Doppel", price: 32 },
  { id: 3, name: "Allee", type: "outdoor", indoor: false, mode: "Doppel", price: 26 },
  { id: 4, name: "Lindenhof", type: "outdoor", indoor: false, mode: "Doppel", price: 26 },
  { id: 5, name: "Pavillon", type: "indoor", indoor: true, mode: "Doppel", price: 30 },
  { id: 6, name: "Orangerie", type: "indoor", indoor: true, mode: "Doppel", price: 30 },
  { id: 7, name: "Terrasse", type: "outdoor", indoor: false, mode: "Doppel", price: 26 },
  { id: 8, name: "Remise", type: "indoor", indoor: true, mode: "Doppel", price: 30 },
  { id: 9, name: "Solo Nord", type: "indoor", indoor: true, mode: "Einzel", price: 22 },
  { id: 10, name: "Solo Süd", type: "outdoor", indoor: false, mode: "Einzel", price: 20 },
];

export const TYPE_LABEL = {
  panorama: { de: "Panorama", en: "Panorama" },
  indoor: { de: "Indoor", en: "Indoor" },
  outdoor: { de: "Outdoor", en: "Outdoor" },
};

function seeded(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const NAMES = [
  "M. Bauer",
  "L. Hoffmann",
  "S. Keller",
  "J. Vogt",
  "A. Reza",
  "T. Wolf",
  "N. Brandt",
  "C. Lang",
  "P. Sommer",
  "E. Funke",
  "R. Stein",
  "D. Mertens",
];

function buildGrid(): Record<number, SlotCell[]> {
  const grid: Record<number, SlotCell[]> = {};
  COURTS.forEach((c) => {
    const rnd = seeded(c.id * 977 + 13);
    grid[c.id] = HOURS.map((_, i) => {
      const peak = i >= 5 ? 0.62 : 0.28;
      const booked = rnd() < peak;
      return booked
        ? { state: "booked", who: NAMES[Math.floor(rnd() * NAMES.length)], slot: i }
        : { state: "free", slot: i };
    });
  });
  grid[1][6] = { state: "mine", who: "Du", slot: 6 };
  grid[5][7] = { state: "mine", who: "Du", slot: 7 };
  return grid;
}

export const GRID = buildGrid();

export const EQUIPMENT: Equipment[] = [
  {
    id: "rk-pro",
    cat: "racket",
    name: "Head Speed Pro",
    tag: "Profi · Hard",
    price: 9,
    perDay: false,
    stock: 6,
    blurb: "Diamantform, kontrollierte Power für fortgeschrittene Spieler.",
  },
  {
    id: "rk-soft",
    cat: "racket",
    name: "Bullpadel Vertex",
    tag: "Allround · Soft",
    price: 8,
    perDay: false,
    stock: 10,
    blurb: "Runde Form, großer Sweet-Spot — ideal zum Einstieg.",
  },
  {
    id: "rk-nox",
    cat: "racket",
    name: "Nox AT10 Luxury",
    tag: "Premium",
    price: 12,
    perDay: false,
    stock: 4,
    blurb: "Carbon-Oberfläche, maximale Präzision am Netz.",
  },
  {
    id: "balls",
    cat: "ball",
    name: "Dosen Padelbälle (3)",
    tag: "Druckbälle",
    price: 6,
    perDay: false,
    stock: 40,
    blurb: "Frische Dose mit drei offiziellen Turnierbällen.",
  },
  {
    id: "shoes",
    cat: "shoe",
    name: "Court-Schuhe",
    tag: "Gr. 38–47",
    price: 7,
    perDay: false,
    stock: 22,
    blurb: "Sandplatz-Profil für sicheren Halt, frisch desinfiziert.",
  },
  {
    id: "towel",
    cat: "extra",
    name: "Club-Handtuch",
    tag: "Frottee",
    price: 3,
    perDay: false,
    stock: 60,
    blurb: "Weiches Clubhandtuch mit eingesticktem VOLEA-Wappen.",
  },
  {
    id: "grip",
    cat: "extra",
    name: "Overgrip-Set (3)",
    tag: "Verbrauch",
    price: 4,
    perDay: false,
    stock: 50,
    blurb: "Saugstarke Griffbänder — bleiben deins.",
  },
  {
    id: "water",
    cat: "extra",
    name: "Iso-Trinkflasche",
    tag: "0,75 l",
    price: 5,
    perDay: false,
    stock: 30,
    blurb: "Isolierte Edelstahlflasche, kühl über die ganze Partie.",
  },
];

export const CAT_LABEL = {
  racket: { de: "Schläger", en: "Rackets" },
  ball: { de: "Bälle", en: "Balls" },
  shoe: { de: "Schuhe", en: "Shoes" },
  extra: { de: "Extras", en: "Extras" },
};

export const ME: UserProfile = {
  name: "Nora Brandt",
  initials: "NB",
  member: "Premium-Mitglied",
  since: "seit 2024",
  credit: 40,
  level: "Mittel · 3.5",
};

export const MY_BOOKINGS: Booking[] = [
  {
    id: "b1",
    court: 1,
    date: "Heute",
    slot: 6,
    time: "17:00",
    players: 4,
    gear: ["2× Head Speed Pro", "Dose Bälle"],
    price: 38,
    status: "bestätigt",
  },
  {
    id: "b2",
    court: 5,
    date: "Heute",
    slot: 7,
    time: "18:30",
    players: 2,
    gear: [],
    price: 30,
    status: "bestätigt",
  },
  {
    id: "b3",
    court: 2,
    date: "Sa, 7. Juni",
    slot: 4,
    time: "14:00",
    players: 4,
    gear: ["4× Court-Schuhe"],
    price: 60,
    status: "bestätigt",
  },
];

export const WEEK: WeekDay[] = [
  { d: "Mo", court: 640, gear: 96 },
  { d: "Di", court: 720, gear: 110 },
  { d: "Mi", court: 880, gear: 142 },
  { d: "Do", court: 760, gear: 128 },
  { d: "Fr", court: 1180, gear: 214 },
  { d: "Sa", court: 1460, gear: 268 },
  { d: "So", court: 1290, gear: 232 },
];

export const OCC_CURVE = [22, 28, 34, 30, 26, 40, 64, 86, 92, 70];

export const FEED: FeedItem[] = [
  { who: "L. Hoffmann", act: "Platz Glashaus · 18:30", amt: 32, ago: "vor 2 Min", gear: true },
  { who: "S. Keller", act: "Platz Center · 20:00", amt: 38, ago: "vor 11 Min", gear: true },
  { who: "J. Vogt", act: "Ausrüstung · 2 Schläger", amt: 16, ago: "vor 23 Min", gear: true },
  { who: "A. Reza", act: "Platz Pavillon · 17:00", amt: 30, ago: "vor 38 Min", gear: false },
  { who: "T. Wolf", act: "Platz Solo Nord · 12:30", amt: 22, ago: "vor 51 Min", gear: false },
];

export function occStats() {
  let total = 0;
  let booked = 0;
  COURTS.forEach((c) =>
    GRID[c.id].forEach((s) => {
      total++;
      if (s.state !== "free") booked++;
    })
  );
  return { total, booked, pct: Math.round((booked / total) * 100), free: total - booked };
}

export function courtById(id: number) {
  return COURTS.find((c) => c.id === id)!;
}

export function equipmentById(id: string) {
  return EQUIPMENT.find((e) => e.id === id);
}

export function cartTotal(cart: Record<string, number>) {
  return Object.entries(cart).reduce(
    (sum, [id, q]) => sum + (equipmentById(id)?.price || 0) * q,
    0
  );
}

export function cartCount(cart: Record<string, number>) {
  return Object.values(cart).reduce((a, b) => a + b, 0);
}
