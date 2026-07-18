// Marker positions live in the same projected space as US_STATES_PATH (viewBox 0 0 975 610).
// `target` is the id of the section a click scrolls to. Label offsets are hand-tuned.

export type Stop = {
  id: string;
  label: string;
  st: string;
  x: number;
  y: number;
  target: string;
  ldx: number;
  ldy: number;
  anchor: "start" | "middle" | "end";
};

export type Poi = { label: string; x: number; y: number };

export const STOPS: Stop[] = [
  { id: "seattle", label: "Seattle", st: "WA", x: 102.4, y: 44.9, target: "seattle-to-spokane", ldx: 11, ldy: 4, anchor: "start" },
  { id: "spokane", label: "Spokane", st: "WA", x: 174.9, y: 62.3, target: "seattle-to-spokane", ldx: 11, ldy: 0, anchor: "start" },
  { id: "missoula", label: "Missoula", st: "MT", x: 222.6, y: 90.3, target: "montana", ldx: 11, ldy: 5, anchor: "start" },
  { id: "bozeman", label: "Bozeman", st: "MT", x: 263.1, y: 124.5, target: "montana", ldx: 11, ldy: 9, anchor: "start" },
  { id: "devils-tower", label: "Devils Tower", st: "WY", x: 359.1, y: 161.1, target: "devils-tower", ldx: -4, ldy: -12, anchor: "middle" },
  { id: "black-hills", label: "Mt Rushmore", st: "SD", x: 377.8, y: 178.7, target: "black-hills", ldx: -10, ldy: 10, anchor: "end" },
  { id: "badlands", label: "Badlands NP", st: "SD", x: 395.7, y: 180.6, target: "badlands", ldx: 10, ldy: -6, anchor: "start" },
  { id: "sioux-falls", label: "Sioux Falls", st: "SD", x: 485.8, y: 190.9, target: "corn-belt", ldx: 11, ldy: -3, anchor: "start" },
  { id: "des-moines", label: "Des Moines", st: "IA", x: 537.1, y: 234.6, target: "corn-belt", ldx: -11, ldy: 4, anchor: "end" },
  { id: "peoria", label: "Peoria", st: "IL", x: 605.5, y: 251.6, target: "corn-belt", ldx: 0, ldy: -11, anchor: "middle" },
  { id: "columbus-in", label: "Columbus IN", st: "IN", x: 670.6, y: 279.8, target: "columbus-indiana", ldx: 0, ldy: 19, anchor: "middle" },
  { id: "columbus-oh", label: "Columbus OH", st: "OH", x: 718.1, y: 256.7, target: "fallingwater", ldx: -4, ldy: -11, anchor: "middle" },
  { id: "fallingwater", label: "Fallingwater", st: "PA", x: 777.7, y: 248.6, target: "fallingwater", ldx: 4, ldy: -12, anchor: "middle" },
  { id: "fairfax", label: "Fairfax", st: "VA", x: 818.5, y: 265.4, target: "home", ldx: 9, ldy: 14, anchor: "start" },
];

export const POIS: Poi[] = [
  { label: "Wild Horses Monument, Vantage WA", x: 133.5, y: 68.1 },
  { label: "Deadwood SD", x: 374.4, y: 167.2 },
  { label: "Sioux City IA", x: 491.1, y: 214.6 },
  { label: "Winterset IA, Bridges of Madison County", x: 530.8, y: 240.5 },
  { label: "Kalona IA", x: 569.1, y: 235.0 },
];

// Driving route, drawn through the stops and the places we detoured to.
export const ROUTE: [number, number][] = [
  [102.4, 44.9], // Seattle
  [133.5, 68.1], // Vantage
  [174.9, 62.3], // Spokane
  [222.6, 90.3], // Missoula
  [263.1, 124.5], // Bozeman
  [359.1, 161.1], // Devils Tower
  [374.4, 167.2], // Deadwood
  [377.8, 178.7], // Mt Rushmore
  [395.7, 180.6], // Badlands
  [485.8, 190.9], // Sioux Falls
  [491.1, 214.6], // Sioux City
  [530.8, 240.5], // Winterset
  [537.1, 234.6], // Des Moines
  [569.1, 235.0], // Kalona
  [605.5, 251.6], // Peoria
  [670.6, 279.8], // Columbus IN
  [718.1, 256.7], // Columbus OH
  [777.7, 248.6], // Fallingwater
  [818.5, 265.4], // Fairfax
];
