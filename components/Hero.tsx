// components/Hero.tsx
"use client";

import { useState } from "react";
import { cities } from "../data/cities";
import { MapPin, TrendingUp, Users, Clock, ArrowRight } from "lucide-react";

type HeroProps = {
  onSelectCity?: (city: string) => void;
};

export default function Hero({ onSelectCity }: HeroProps) {
  const [selectedCity, setSelectedCity] = useState("");
  const freeCities = cities.filter((c) => c.status === "free");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCity && onSelectCity) {
      onSelectCity(selectedCity);
    }
  };

  return (
    <section className="relative w-full min-h-[80vh] flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-[10%] w-[600px] h-[600px] bg-purple-500 rounded-full blur-[150px]" />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 flex flex-col flex-1">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-8 w-fit">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Принимаем заявки на 2026 год
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
            Дилерство <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">ivan.ru</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mb-10">
            Окупаемость с <span className="text-indigo-400 font-semibold">30%</span> в первый месяц. 
            Более <span className="text-indigo-400 font-semibold">200</span> успешных запусков.
          </p>

          <div className="flex flex-wrap gap-12 mb-10">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
              <div className="text-4xl font-bold text-white">30%</div>
              <div className="text-sm text-slate-400">Окупаемость</div>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
              <div className="text-4xl font-bold text-white">200+</div>
              <div className="text-sm text-slate-400">Дилеров</div>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
              <div className="text-4xl font-bold text-white">15 дн</div>
              <div className="text-sm text-slate-400">До запуска</div>
            </div>
          </div>
        </div>

        {onSelectCity && (
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Выберите свой город
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl">
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="" className="text-slate-900">Выберите город</option>
                  {freeCities.map((city) => (
                    <option key={city.id} value={city.name} className="text-slate-900">
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={!selectedCity}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                Оставить заявку
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}

        <p className="text-sm text-slate-500">
          Ответим за 24 часа
        </p>
      </div>
    </section>
  );
}