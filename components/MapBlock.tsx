"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

const Map = dynamic(() => import("./Map"), { ssr: false });

type MapBlockProps = {
  onSelectCity: (city: string) => void;
};

export default function MapBlock({ onSelectCity }: MapBlockProps) {
  return (
    <section id="city" className="w-full bg-white">
      <div className="w-full max-w-7xl mx-auto px-0">
        <div className="text-center mb-6 px-6 pt-12">
          <MapPin className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Выберите свой город
          </h2>
          <p className="text-lg text-slate-600">
            Нажмите на свободный город на карте
          </p>
        </div>

        <div className="w-full" style={{ height: '500px' }}>
          <Map onSelectCity={onSelectCity} />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm px-6 pb-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-slate-600">Свободно</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-slate-600">Занято</span>
          </div>
        </div>
      </div>
    </section>
  );
}