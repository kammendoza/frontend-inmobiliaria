"use client";

import { FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import BorderGlow from "../ui/BorderGlow/BorderGlow";

export default function LotSearchForm() {
  const whatsappNumber = "51958083134";
  const whatsappMessage = "Hola,%20deseo%20contactarme%20con%20un%20asesor.";

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto p-2">
      <BorderGlow
        className="w-full"
        edgeSensitivity={30}
        glowColor="205 100 35"
        backgroundColor="#ffffff"
        borderRadius={16}
        glowRadius={40}
        glowIntensity={1}
        coneSpread={25}
        animated={false}
        colors={['#0069b3', '#0069b3', '#0069b3']}
      >
        <div className="bg-white rounded-2xl p-3 flex flex-col md:flex-row items-center gap-3 w-full shadow-xl">
          
          {/* Selector */}
          <div className="flex-1 w-full px-4 py-2 text-left">
            <label className="block text-xs text-gray-800 font-medium mb-1">Seleccionar</label>
            <select className="w-full text-sm text-gray-500 bg-transparent outline-none cursor-pointer">
              <option>Lotes Urbanizados</option>
            </select>
          </div>

          {/* Input de texto */}
          <div className="flex-1 w-full px-4 py-2 text-left border-t md:border-t-0 md:border-l border-gray-200">
            <label className="block text-xs text-gray-800 font-medium mb-1">¿En Dónde la Buscas?</label>
            <input 
              type="text" 
              placeholder="Ej. Guaral, San Antonio..." 
              className="w-full text-sm text-gray-500 bg-transparent outline-none"
            />
          </div>

          {/* Botón Rojo (#e40139) - Lleva a la sección de proyectos */}
          <a 
            href="#proyectos-destacados" // Si tienes un ID en tu sección de proyectos, ponlo aquí
            className="w-full md:w-auto px-6 py-3.5 bg-[#e40139] text-white font-bold rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <FaMapMarkerAlt /> Ver lotes disponibles
          </a>

          {/* BOTÓN DE WHATSAPP CORREGIDO */}
          <a 
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-6 py-3.5 bg-white text-[#0069b3] font-bold rounded-xl border border-[#0069b3] hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <FaWhatsapp className="text-[#0069b3] text-lg" /> Contáctanos
          </a>

        </div>
      </BorderGlow>
    </div>
  );
}