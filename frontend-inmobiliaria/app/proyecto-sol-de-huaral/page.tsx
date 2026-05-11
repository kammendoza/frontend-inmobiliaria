"use client";

import SolDeHuaralDetail from "@/components/sections/SolDeHuaralDetail";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SolDeHuaralPage() {
  return (
    <main className="min-h-screen font-montserrat bg-white flex flex-col">
      <Header 
        currentView="projects"
        // 🌟 CAMBIO AQUÍ: Usamos window.location para forzar la carga de la sección
        onShowProjects={() => window.location.href = '/#proyectos'}
        onShowHome={() => window.location.href = '/'}
      />
      
      <div className="flex-grow">
        <SolDeHuaralDetail />
      </div>

      <Footer />
    </main>
  );
}