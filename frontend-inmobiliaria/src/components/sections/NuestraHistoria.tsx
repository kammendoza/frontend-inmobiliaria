"use client";
import { FaHistory, FaUsers, FaAward, FaArrowLeft } from "react-icons/fa";

// 1. ✅ Agregamos onGoToProjects a la interfaz
interface NuestraHistoriaProps {
  onBack: () => void;
  onGoToProjects: () => void;
}

// 2. ✅ Recibimos onGoToProjects en el componente
export default function NuestraHistoria({ onBack, onGoToProjects }: NuestraHistoriaProps) {
  const hitos = [
    { 
      año: "2023", 
      titulo: "El Comienzo", 
      desc: "Nacemos con la visión de transformar el sector inmobiliario en el norte chico, facilitando el acceso formal a la vivienda.",
      icon: <FaHistory />,
      color: "#0069b3",
      imagen: "/IMG_CLIENTES/cliente1.jpeg"
    },
    { 
      año: "2024", 
      titulo: "Primeros Pasos", 
      desc: "Iniciamos operaciones con un equipo apasionado, logrando conectar a las primeras familias con su sueño del terreno propio.",
      icon: <FaHistory />,
      color: "#e40139",
      imagen: "/IMG_CLIENTES/cliente2.jpeg"
    },
    { 
      año: "2025", 
      titulo: "Consolidación", 
      desc: "A pesar de los retos, entregamos más de 300 lotes con servicios completos, ganando la confianza de las familias peruanas.",
      icon: <FaUsers />,
      color: "#0069b3",
      imagen: "/IMG_CLIENTES/cliente3.jpeg"
    },
    { 
      año: "2026", 
      titulo: "Innovación y Futuro", 
      desc: "Lideramos proyectos sostenibles con tecnología de punta y seguridad jurídica garantizada en cada metro cuadrado.",
      icon: <FaAward />,
      color: "#e40139",
      imagen: "/IMG_CLIENTES/cliente4.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-montserrat">
      
      {/* FONDO DECORATIVO LEVE */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-40 left-[-10%] w-[40%] h-[40%] bg-[#0069b3]/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-[-10%] w-[40%] h-[40%] bg-[#e40139]/5 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* AJUSTE: pt-40 para bajar todo el contenido respecto al Header */}
      <div className="container mx-auto max-w-6xl pt-40 pb-24 px-4 relative z-10">

        {/* Encabezado con más margen inferior (mb-48) */}
        <div className="text-center mb-48 relative">
          <h2 className="text-8xl md:text-[12rem] font-black text-slate-100/50 absolute inset-0 -top-10 md:-top-20 select-none z-0 uppercase tracking-tighter">
            HISTORIA
          </h2>
          <h3 className="relative text-4xl md:text-6xl font-bold text-[#0069b3] z-10">
            Nuestra <span className="text-[#e40139]">Trayectoria</span>
          </h3>
          <div className="w-24 h-2 bg-[#e40139] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Timeline Interactiva */}
        <div className="relative space-y-32">
          {/* Línea central */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-slate-100 via-[#0069b3]/20 to-slate-100 hidden md:block"></div>

          {hitos.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Lado de la Tarjeta de Texto */}
              <div className="w-full md:w-[45%] flex justify-center px-4">
                <div 
                  className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,105,179,0.12)] hover:-translate-y-3 group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-2xl bg-slate-50 text-2xl shadow-inner" style={{ color: item.color }}>
                      {item.icon}
                    </div>
                    <span className="text-3xl font-black italic opacity-20">{item.año}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-[#0069b3] transition-colors">
                    {item.titulo}
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Punto en la línea */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-4 border-white shadow-xl flex items-center justify-center bg-white">
                  <div className="w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: item.color }}></div>
                </div>
              </div>

              {/* Lado de la Imagen */}
              <div className="w-full md:w-[45%] flex justify-center px-4">
                <div className="relative group">
                  <div className={`absolute -inset-4 rounded-[2rem] opacity-20 blur-lg transition-all group-hover:opacity-40`} style={{ backgroundColor: item.color }}></div>
                  <div className="relative w-full aspect-[4/3] md:w-80 overflow-hidden rounded-[2rem] shadow-2xl border-4 border-white transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-2">
                    <img 
                      src={item.imagen} 
                      alt={item.titulo} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = "/IMG1.jpg" }} 
                    />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Cierre Visual */}
        <div className="mt-48 p-12 rounded-[4rem] bg-[#0069b3] text-white text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 transition-transform group-hover:scale-125"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#e40139]/20 rounded-full -ml-32 -mb-32"></div>
          
          <h4 className="text-4xl font-bold mb-6 relative z-10">¿Listo para ser parte de esta historia?</h4>
          <p className="mb-10 opacity-90 relative z-10 max-w-2xl mx-auto text-lg">
            Cada año sumamos nuevas familias felices. Tu terreno en Huaral o San Antonio es el próximo hito.
          </p>
          <button 
            onClick={onGoToProjects} // 3. ✅ Aquí aplicamos el cambio para que te lleve a proyectos
            className="bg-white text-[#0069b3] px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-[#e40139] hover:text-white transition-all shadow-xl relative z-10 transform active:scale-95"
          >
            Ver Proyectos Ahora
          </button>
        </div>
      </div>
    </div>
  );
}