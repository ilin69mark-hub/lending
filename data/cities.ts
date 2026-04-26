export type City = {
  id: number;
  name: string;
  coords: [number, number];
  status: "free" | "taken";
};

export const cities: City[] = [
  { id: 1, name: "Москва", coords: [55.755826, 37.6173], status: "free" },
  { id: 2, name: "Санкт-Петербург", coords: [59.9311, 30.3609], status: "free" },
  { id: 3, name: "Екатеринбург", coords: [56.8389, 60.6057], status: "free" },
  { id: 4, name: "Казань", coords: [55.8304, 49.0661], status: "free" },
  { id: 5, name: "Нижний Новгород", coords: [56.2965, 43.9366], status: "free" },
  { id: 6, name: "Челябинск", coords: [55.1644, 61.4368], status: "free" },
  { id: 7, name: "Самара", coords: [53.2028, 50.1913], status: "free" },
  { id: 8, name: "Уфа", coords: [54.7352, 55.9835], status: "free" },
  { id: 9, name: "Волгоград", coords: [48.7194, 44.5018], status: "free" },
  { id: 10, name: "Пермь", coords: [58.0176, 56.2855], status: "free" },
  { id: 11, name: "Воронеж", coords: [51.6720, 39.1843], status: "free" },
  { id: 12, name: "Саратов", coords: [51.5331, 45.9871], status: "free" },
  { id: 13, name: "Краснодар", coords: [45.0448, 38.9766], status: "free" },
  { id: 14, name: "Тольятти", coords: [53.5099, 49.4198], status: "free" },
  { id: 15, name: "Ижевск", coords: [56.8522, 53.2047], status: "free" },
  { id: 16, name: "Барнаул", coords: [53.3811, 83.7518], status: "free" },
  { id: 17, name: "Ульяновск", coords: [54.3053, 48.3745], status: "free" },
  { id: 18, name: "Тюмень", coords: [57.1530, 65.5343], status: "free" },
  { id: 19, name: "Иркутск", coords: [52.2868, 104.2308], status: "free" },
  { id: 20, name: "Владивосток", coords: [43.1332, 131.9113], status: "free" },
  { id: 21, name: "Томск", coords: [56.4846, 84.9476], status: "free" },
  { id: 22, name: "Кемерово", coords: [55.3552, 86.0868], status: "free" },
  { id: 23, name: "Новокузнецк", coords: [53.7576, 87.1361], status: "free" },
  { id: 24, name: "Омск", coords: [54.9893, 73.3682], status: "free" },
  { id: 25, name: "Астрахань", coords: [46.3476, 48.0302], status: "free" },
  { id: 26, name: "Кострома", coords: [57.7679, 40.9268], status: "taken" },
  { id: 27, name: "Псков", coords: [57.8193, 28.3328], status: "taken" },
  { id: 28, name: "Тобольск", coords: [58.1887, 68.2405], status: "taken" },
  { id: 29, name: "Нижнекамск", coords: [55.6376, 51.8197], status: "taken" },
  { id: 30, name: "Миасс", coords: [55.0504, 60.1096], status: "taken" },
  { id: 31, name: "Набережные Челны", coords: [55.7413, 52.4037], status: "taken" },
  { id: 32, name: "Сургут", coords: [61.2418, 73.3930], status: "taken" },
  { id: 33, name: "Норильск", coords: [69.3440, 88.2104], status: "taken" },
  { id: 34, name: "Ханты-Мансийск", coords: [61.0032, 69.0189], status: "taken" },
  { id: 35, name: "Мурманск", coords: [68.9695, 33.0827], status: "taken" },
  { id: 36, name: "Петропавловск-Камчатский", coords: [53.0452, 158.6531], status: "taken" },
  { id: 37, name: "Калининград", coords: [54.7224, 20.4619], status: "taken" },
  { id: 38, name: "Сочи", coords: [43.6037, 39.7368], status: "taken" },
  { id: 39, name: "Севастополь", coords: [44.5888, 33.4744], status: "taken" },
  { id: 40, name: "Симферополь", coords: [44.9521, 34.1025], status: "taken" },
];