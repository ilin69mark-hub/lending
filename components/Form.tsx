"use client";

import { useState } from "react";

export default function Form({ selectedCity }: any) {
  const [form, setForm] = useState({
    name: "",
    city: selectedCity || "",
    phone: "",
    reason: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/lead", {
      method: "POST",
      body: JSON.stringify(form),
    });

    alert("Заявка отправлена");
  };

  return (
    <section id="form" className="py-20 bg-gray-100">
      <h2 className="text-3xl text-center mb-10">
        Оставьте заявку
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto space-y-4"
      >
        <input
          placeholder="Имя"
          className="w-full p-3 rounded-xl"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Город"
          value={form.city}
          className="w-full p-3 rounded-xl"
          onChange={(e) =>
            setForm({ ...form, city: e.target.value })
          }
        />

        <input
          placeholder="Телефон"
          className="w-full p-3 rounded-xl"
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <select
          className="w-full p-3 rounded-xl"
          onChange={(e) =>
            setForm({ ...form, reason: e.target.value })
          }
        >
          <option value="">Почему хотите открыть?</option>
          <option>Доход</option>
          <option>Бизнес</option>
          <option>Инвестиция</option>
        </select>

        <button className="w-full bg-black text-white py-3 rounded-xl">
          Отправить
        </button>
      </form>
    </section>
  );
}