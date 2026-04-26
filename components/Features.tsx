// components/Features.tsx
import { Shield, BarChart3, HeadphonesIcon, Globe, Zap, Award } from "lucide-react";

export default function Features() {
  const items = [
    {
      title: "Контроль процессов",
      desc: "Единая система управления всеми точками в режиме реального времени",
      icon: Shield,
    },
    {
      title: "Аналитика",
      desc: "Детальные отчёты о продажах, трафике и прибыли в личном кабинете",
      icon: BarChart3,
    },
    {
      title: "Поддержка 24/7",
      desc: "Персональный менеджер и техническая поддержка на всех этапах",
      icon: HeadphonesIcon,
    },
    {
      title: "Федеральный бренд",
      desc: "Узнаваемый бренд с многомиллионной аудиторией",
      icon: Globe,
    },
    {
      title: "Быстрый запуск",
      desc: "От подписания договора до открытия точки за 15 дней",
      icon: Zap,
    },
    {
      title: "Без роялти",
      desc: "Прозрачная система без скрытых платежей и роялти",
      icon: Award,
    },
  ];

  return (
    <section className="w-full py-20 bg-slate-50">
      <div className="w-full max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center">
          Почему выбирают нас
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all"
            >
              <item.icon className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}