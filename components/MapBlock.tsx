"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function MapBlock({ onSelectCity }: any) {
  return (
    <section className="py-20 px-6 text-center">
      <h2 className="text-3xl font-semibold mb-6">
        Выберите свой город
      </h2>

      <div className="max-w-5xl mx-auto">
        <Map onSelectCity={onSelectCity} />
      </div>
    </section>
  );
}