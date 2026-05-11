// src/components/sections/Hero.tsx
"use client";
import LotSearchForm from "./LotSearchForm";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="/fondo-principal.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#e40139]/30 mix-blend-multiply z-0"></div>
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="relative z-10 w-full max-w-5xl mx-4 text-center mt-12 font-montserrat">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">
          Construye tu <br /> futuro, hoy
        </h1>
        <p className="text-base md:text-lg text-white mb-10 drop-shadow max-w-3xl mx-auto font-medium">
          Lotes urbanizados con seguridad legal, financiamiento y ubicación estratégica.
        </p>
        <LotSearchForm />
      </div>
    </section>
  );
}