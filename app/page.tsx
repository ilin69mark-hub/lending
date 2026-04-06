"use client";                     // <‑‑ ДУБЛЬ, делает файл клиентским

import { useState } from "react";

import Hero from "@/components/Hero";
import MapBlock from "@/components/MapBlock";
import Income from "@/components/Income";
import Features from "@/components/Features";
import Form from "@/components/Form";

export default function Page() {
  const [selectedCity, setSelectedCity] = useState<string>("");

  return (
    <main className="flex flex-col items-center">
      <Hero />
      <MapBlock onSelectCity={setSelectedCity} />
      <Income />
      <Features />
      <Form selectedCity={selectedCity} />
    </main>
  );
}
