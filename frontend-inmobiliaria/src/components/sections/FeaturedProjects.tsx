"use client";
import { useState } from "react";
import { FaSearch, FaExpandArrowsAlt, FaTag } from "react-icons/fa";

const lotes = [
  {
    id: 1,
    titulo: "Sol de Huaral",
    badge: "Huaral",
    area: "120 m²",
    precio: "S/ 10,000",
    desc: "Terreno listo para construir, con servicios básicos y zona de crecimiento rápido.",
    img: "/proyectos/lote1.jpg",
    slug: "/proyecto-sol-de-huaral"
  },
  {
    id: 2,
    titulo: "Las Terrazas de San Antonio",
    badge: "Sur",
    area: "200 m²",
    precio: "S/ 25,000",
    desc: "Terreno listo para construir en una zona estratégica, ideal para casa de playa o inversión.",
    img: "/proyectos/lote2.jpg",
    slug: "/proyecto-terrazas-de-san-antonio"
  }
];

export default function FeaturedProjects() {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => setSearchTerm(inputValue);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    /* 🌟 Eliminamos las clases de animación que causaban la pantalla blanca al retroceder */
    <div id="proyectos" className="w-full bg-white font-montserrat py-20 block opacity-100">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0069b3] uppercase mb-4 tracking-tight">
            Encuentra tu <span className="text-[#e40139]">lugar ideal</span>
          </h2>
          <div className="w-16 h-1 bg-[#e40139] mx-auto rounded-full"></div>
        </div>
        
        <div className="flex max-w-2xl mx-auto items-center bg-white rounded-2xl overflow-hidden mb-20 shadow-lg border border-gray-100">
          <div className="pl-6 text-gray-300"><FaSearch /></div>
          <input type="text" placeholder="¿En qué zona buscas tu lote?..." className="flex-grow p-4 outline-none text-gray-500 text-sm font-light" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown}/>
          <button onClick={handleSearch} className="bg-[#0069b3] px-10 py-4 text-white font-bold hover:bg-[#e40139] transition-all uppercase text-xs tracking-widest">Buscar</button>
        </div>

        <div className="flex flex-col gap-12">
          {lotes.filter(lote => lote.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || lote.badge.toLowerCase().includes(searchTerm.toLowerCase())).map((lote) => (
            <div key={lote.id} className="group bg-white rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.06)] overflow-hidden border border-gray-50 flex flex-col md:flex-row transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,105,179,0.1)]">
              
              <div className="relative w-full md:w-1/2 h-72 md:h-auto overflow-hidden">
                <img src={lote.img} alt={lote.titulo} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <span className="absolute top-6 left-6 bg-[#e40139] text-white px-5 py-2 rounded-full text-[10px] font-bold shadow-lg uppercase tracking-widest">{lote.badge}</span>
              </div>
              
              <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center bg-white">
                <h3 className="text-3xl font-bold text-[#0069b3] mb-6 leading-tight">{lote.titulo}</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1 flex justify-center items-center gap-1"><FaExpandArrowsAlt className="text-[#0069b3] opacity-50" /> Área</p>
                    <p className="text-lg font-bold text-gray-700">{lote.area}</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1 flex justify-center items-center gap-1"><FaTag className="text-[#e40139] opacity-50" /> Inicial</p>
                    <p className="text-lg font-bold text-[#0069b3]">{lote.precio}</p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed mb-10 font-light text-sm italic">{lote.desc}</p>
                
                {/* 🌟 CAMBIO CLAVE: Usamos <a> para que el navegador gestione la carga limpia al retroceder */}
                <a 
                  href={lote.slug}
                  className="w-full py-4 bg-[#0069b3] text-white font-bold rounded-xl text-xs hover:bg-[#e40139] transition-all duration-300 shadow-lg uppercase tracking-[0.2em] text-center inline-block"
                >
                  Ver proyecto completo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}