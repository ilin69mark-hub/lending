export default function Features() {
  return (
    <section className="py-20">
      <h2 className="text-3xl text-center font-semibold mb-10">
        Что вы получаете
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="p-6 border rounded-xl">
          <h3 className="font-bold">Контроль</h3>
          <p>Все процессы в одном окне</p>
        </div>

        <div className="p-6 border rounded-xl">
          <h3 className="font-bold">Аналитика</h3>
          <p>Данные в реальном времени</p>
        </div>

        <div className="p-6 border rounded-xl">
          <h3 className="font-bold">Поддержка</h3>
          <p>Помощь на всех этапах</p>
        </div>
      </div>
    </section>
  );
}