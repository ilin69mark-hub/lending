// components/Income.tsx
import { TrendingUp, Wallet, DollarSign } from "lucide-react";

export default function Income() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="w-full max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center">
          Доходность проекта
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl text-white">
            <TrendingUp className="w-10 h-10 mb-4" />
            <div className="text-5xl font-bold mb-2">30%</div>
            <div className="text-indigo-200 text-lg">Средняя доходность за первый месяц</div>
          </div>

          <div className="p-8 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl text-white">
            <Wallet className="w-10 h-10 mb-4" />
            <div className="text-5xl font-bold mb-2">2-3 млн ₽</div>
            <div className="text-emerald-200 text-lg">Средний ежемесячный оборот</div>
          </div>

          <div className="p-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl text-white">
            <DollarSign className="w-10 h-10 mb-4" />
            <div className="text-5xl font-bold mb-2">от 5 млн ₽</div>
            <div className="text-purple-200 text-lg">Стартовая инвестиция</div>
          </div>
        </div>
      </div>
    </section>
  );
}