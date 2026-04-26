// components/Infographic.tsx
import { Target, Users, TrendingUp } from "lucide-react";

export default function Infographic() {
  const items = [
    {
      title: "ROI 30%+",
      desc: "Прибыль уже в первый месяц работы",
      icon: TrendingUp,
    },
    {
      title: "200+ Дилеров",
      desc: "Партнёры по всей России и СНГ",
      icon: Users,
    },
    {
      title: "От 5 млн ₽",
      desc: "Минимальная стартовая инвестиция",
      icon: Target,
    },
  ];

  return (
    <section className="w-full py-20 bg-slate-900">
      <div className="w-full max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
          Преимущества партнёрства
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700 text-center"
            >
              <item.icon className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}