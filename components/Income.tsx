export default function Income() {
  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl font-semibold mb-10">
        Потенциал дохода
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="p-6 shadow rounded-xl">
          <p className="text-2xl font-bold">500 000 ₽+</p>
          <p>Выручка</p>
        </div>
        <div className="p-6 shadow rounded-xl">
          <p className="text-2xl font-bold">6-12 мес</p>
          <p>Окупаемость</p>
        </div>
        <div className="p-6 shadow rounded-xl">
          <p className="text-2xl font-bold">30%</p>
          <p>Маржа</p>
        </div>
      </div>
    </section>
  );
}