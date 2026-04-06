"use client";

import { useState, Dispatch, SetStateAction } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

/* типы Leaflet – нужны лишь для координат маркеров */
import type { LatLngExpression } from "leaflet";

/* -------------------------------------------------------------
 * Если в проекте нет файла с декларацией CSS‑модулей, создайте:
 *   src/types/css.d.ts   (или global.d.ts в корне)
 *   -----------------------------------------------------------
 *   declare module "*.css";
 * ------------------------------------------------------------- */

/* ----------------------- Тип города ----------------------- */
export type City = {
  id: number;
  name: string;
  coords: [number, number];
  status: "free" | "taken";
};

/* Примерный набор городов – замените на свои данные */
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

/* ----------------------- Пропсы ----------------------- */
type MapProps = {
  /** Функция‑колбэк, вызываемая при выборе свободного города */
  onSelectCity: Dispatch<SetStateAction<string>>;
};

/* ----------------------- Компонент ----------------------- */
export default function Map({ onSelectCity }: MapProps) {
  const [activeCity, setActiveCity] = useState<string>("");

  /** Прокрутка к форме заявки */
  const scrollToForm = () => {
    document.getElementById("form")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  /* -------------------------------------------------
   * Приводим все Leaflet‑компоненты к типу `any`,
   * потому что в react‑leaflet@5 их типы отстают.
   * ------------------------------------------------- */
  const AnyMapContainer = MapContainer as any;
  const AnyTileLayer = TileLayer as any;
  const AnyCircleMarker = CircleMarker as any;
  const AnyTooltip = Tooltip as any;

  return (
    <div>
      {/* ---------- Карта ---------- */}
      <AnyMapContainer
        center={[55.751244, 37.618423]}
        zoom={5}
        style={{ height: "400px", width: "100%" }}
      >
        <AnyTileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ---------- Маркеры ---------- */}
        {cities.map((city) => (
          <AnyCircleMarker
            key={city.id}
            center={city.coords as LatLngExpression}
            radius={city.name === activeCity ? 14 : 10}
            pathOptions={{
              color: city.status === "free" ? "green" : "red",
            }}
            eventHandlers={{
              click: () => {
                if (city.status === "free") {
                  setActiveCity(city.name);
                  onSelectCity(city.name);
                }
              },
            }}
          >
            {/* Tooltip – показываем название и статус города */}
            <AnyTooltip direction="top" offset={[0, -10]} opacity={1} permanent>
              <div className="text-center">
                <p className="font-bold">{city.name}</p>
                <p>
                  {city.status === "free"
                    ? "Свободен — открыть"
                    : "Занят"}
                </p>
              </div>
            </AnyTooltip>
          </AnyCircleMarker>
        ))}
      </AnyMapContainer>

      {/* ---------- Выбранный город / CTA ---------- */}
      {activeCity && (
        <div className="text-center mt-6">
          <p className="mb-2">
            Вы выбрали: <b>{activeCity}</b>
          </p>
          <button
            onClick={scrollToForm}
            className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Открыть в этом городе
          </button>
        </div>
      )}
    </div>
  );
}
