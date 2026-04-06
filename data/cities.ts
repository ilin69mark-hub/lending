export type City = {
  id: number;
  name: string;
  /** координаты в виде [lat, lng] */
  coords: [number, number];
  /** статус города */
  status: "free" | "taken";
};

export const cities: City[] = [
  {
    id: 1,
    name: "Москва",
    coords: [55.751244, 37.618423],
    status: "free",
  },
  {
    id: 2,
    name: "Санкт‑Петербург",
    coords: [59.93428, 30.335099],
    status: "taken",
  },
  // …добавьте остальные города
];
