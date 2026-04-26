// app/page.tsx
"use client";

import { useState } from "react";

import Hero from "@/components/Hero";
import MapBlock from "@/components/MapBlock";
import Income from "@/components/Income";
import Features from "@/components/Features";
import Infographic from "@/components/Infographic";
import Form from "@/components/Form";

export default function Page() {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [isFormOpen, setFormOpen] = useState(false);

  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
    setFormOpen(true);
  };

  const closeForm = () => setFormOpen(false);

  return (
    <main className="w-full">
      <Hero onSelectCity={handleSelectCity} />
      <MapBlock onSelectCity={handleSelectCity} />
      <Income />
      <Infographic />
      <Features />

      {isFormOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)"
            }}
            onClick={closeForm}
          />
          <div style={{
            position: "relative",
            backgroundColor: "white",
            padding: "32px",
            borderRadius: "16px",
            maxWidth: "450px",
            width: "90%",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}>
            <button
              onClick={closeForm}
              style={{
                position: "absolute",
                right: "16px",
                top: "16px",
                border: "none",
                background: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#666"
              }}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center text-slate-900">
              Оставьте заявку
            </h2>
            <p className="text-center text-slate-600 mb-4">
              Город: <span className="font-semibold text-indigo-600">{selectedCity}</span>
            </p>
            <Form selectedCity={selectedCity} onClose={closeForm} />
          </div>
        </div>
      )}
    </main>
  );
}