"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  FaMapMarkerAlt, FaWhatsapp, FaChevronLeft, FaChevronRight, 
  FaCheckCircle, FaRulerCombined,
  FaTree, FaSwimmer, FaFutbol, FaHome, FaShieldAlt, FaMap
} from 'react-icons/fa';

export default function ProjectDetail() {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);

  // Imágenes Locales
  const heroImages = ["OBRAS/PISCINA.jpg", "OBRAS/PORTICO.jpg", "OBRAS/VERDE.jpg"];
  
  // GALERÍA ESTILO MENORCA CON TÍTULOS
  const galleryItems = [
    { src: "OBRAS/PORTICO.jpg", title: "PÓRTICO DE INGRESO" },
    { src: "OBRAS/PISCINA2.jpg", title: "CLUB HOUSE" },
    { src: "OBRAS/AVANCES1.jpg", title: "AVANCES" },
    { src: "OBRAS/VIAS.jpg", title: "ÁREAS VERDES" },
    { src: "OBRAS/RESTAURANTE.jpg", title: "RESTAURANTE" },
    { src: "OBRAS/PERGOLAS.jpg", title: "PÉRGOLAS" }
  ];

  // Amenidades
  const amenities = [
    { icon: <FaShieldAlt />, t: "Pórtico de ingreso" },
    { icon: <FaHome />, t: "Club House" },
    { icon: <FaFutbol />, t: "Canchas Deportivas" },
    { icon: <FaSwimmer />, t: "Piscina" },
    { icon: <FaTree />, t: "Áreas Verdes" },
    { icon: <FaCheckCircle />, t: "Servicios Eco" }
  ];

  // Lógica para la galería
  const nextGalleryImage = () => setCurrentGalleryImage(p => (p + 1) % galleryItems.length);
  const prevGalleryImage = () => setCurrentGalleryImage(p => (p === 0 ? galleryItems.length - 1 : p - 1));
  const getPrevIndex = () => (currentGalleryImage === 0 ? galleryItems.length - 1 : currentGalleryImage - 1);
  const getNextIndex = () => (currentGalleryImage + 1) % galleryItems.length;

  // Función para deslizar hacia el formulario
  const scrollToForm = () => {
    document.getElementById('contacto-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // 🌟 NUEVA FUNCIÓN: ENVIAR FORMULARIO A WHATSAPP 🌟
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que la página se recargue
    const formData = new FormData(e.currentTarget);
    
    // Capturamos los datos
    const nombre = formData.get('nombre');
    const dni = formData.get('dni');
    const celular = formData.get('celular');
    const email = formData.get('email');

    // Armamos el mensaje bonito para WhatsApp
    const mensaje = `¡Hola! Quiero conocer más de *Las Terrazas de San Antonio*.%0A%0A*Mis datos:*%0A👤 Nombre: ${nombre}%0A🪪 DNI: ${dni}%0A📱 Celular: ${celular}%0A✉️ Email: ${email}`;

    // Abrimos WhatsApp con tu número
    window.open(`https://wa.me/51958083134?text=${mensaje}`, '_blank');
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="w-full bg-white font-montserrat min-h-screen text-[#0069b7] overflow-clip">
      
      {/* ================= HERO SECTION ESTILO MENORCA ================= */}
      <section className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden bg-slate-100">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentHeroImage} src={heroImages[currentHeroImage]} 
            className="absolute inset-0 w-full h-full object-cover" 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>

        <div className="absolute top-[20%] left-0 md:left-[8%] bg-[#0069b7] p-8 md:p-12 z-10 max-w-lg shadow-2xl border-l-8 border-[#f81200]">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase leading-[1.1] tracking-tight">
            EL LUGAR PARA <br/>
            <span className="text-white">MOMENTOS</span> <br/>
            MEMORABLES
          </h1>
        </div>

        <div className="absolute bottom-8 left-8 flex gap-3 z-10">
          <button onClick={() => setCurrentHeroImage(p => (p === 0 ? heroImages.length-1 : p-1))} className="w-10 h-10 bg-[#0069b7] text-white flex items-center justify-center rounded-full hover:bg-[#f81200] hover:text-white transition-colors"><FaChevronLeft /></button>
          <button onClick={() => setCurrentHeroImage(p => (p + 1) % heroImages.length)} className="w-10 h-10 bg-[#0069b7] text-white flex items-center justify-center rounded-full hover:bg-[#f81200] hover:text-white transition-colors"><FaChevronRight /></button>
        </div>
      </section>

      {/* ================= CONTENIDO PRINCIPAL + FORM STICKY ================= */}
      <div className="container mx-auto max-w-[1300px] px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* ----- COLUMNA IZQUIERDA: CONTENIDO (8/12) ----- */}
          <div className="lg:col-span-8 pt-12 pb-10 space-y-16">
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="text-[#0069b7] font-black text-3xl leading-none">
                  LAS TERRAZAS <br/> <span className="text-[#0069b7] text-lg">DE SAN ANTONIO</span>
                </div>
                <div className="flex gap-2">
                  <span className="bg-[#f81200] text-white px-3 py-1 text-[10px] font-bold uppercase rounded">Sur</span>
                  <span className="bg-[#f81200] text-white px-3 py-1 text-[10px] font-bold uppercase rounded">Terrenos</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-[#0069b7]/20 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <FaMapMarkerAlt className="text-[#0069b7] text-2xl mb-2" />
                  <p className="text-xs font-bold text-[#0069b7]">Km 81. de la Panamericana <br/> Sur</p>
                </div>
                <div className="border border-[#0069b7]/20 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <FaRulerCombined className="text-[#0069b7] text-2xl mb-2" />
                  <p className="text-xs font-bold text-[#0069b7]">Lotes desde <br/> <span className="text-lg">200 m²</span></p>
                </div>
                <div className="border border-[#0069b7] bg-[#f0f9ff] rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <p className="text-xs font-bold text-[#0069b7]">Inicial desde</p>
                  <p className="text-2xl font-black text-[#0069b7]">S/ 20,000</p>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed text-justify">
                Sumérgete en la serenidad de Las Terrazas de San Antonio, donde la brisa del mar se combina armoniosamente con la tranquilidad de un entorno único. Se tiene previsto desarrollar un condominio privado en el Sur, el cual te invita a desconectarte y disfrutar de una vida llena de comodidades, con áreas verdes, pórtico de ingreso y servicios ecoamigables. ¡Bienvenido al refugio que desarrollaremos en San Antonio!
              </p>
            </div>

            {/* Caja Celeste de Financiamiento */}
            <div className="bg-[#0069b7] rounded-3xl p-8 md:p-12 relative mt-20">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#0069b7] text-white px-10 py-4 rounded-3xl text-center shadow-xl border-2 border-white">
                <p className="font-bold text-lg leading-tight">Tú decide <br/> cómo obtener <br/> tu terreno</p>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[20px] border-t-[#0069b7]"></div>
              </div>

              <div className="bg-[#f81200] rounded-full text-white text-center py-4 mt-8 mb-6 shadow-md">
                <p className="text-xs">¡No esperes más!</p>
                <p className="text-3xl font-black">Separa con S/ 500</p>
              </div>
              
              <p className="text-center text-white text-sm mb-6">o págalo en cuotas con Financiamiento Directo</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-full text-center py-4 shadow-sm">
                  <p className="text-xs text-[#0069b7] font-bold">Meses para pagar</p>
                  <p className="text-3xl font-black text-[#0069b7]">84</p>
                </div>
                <div className="bg-white rounded-full text-center py-4 shadow-sm">
                  <p className="text-xs text-[#0069b7] font-bold">Sin intereses hasta</p>
                  <p className="text-3xl font-black text-[#0069b7]">12 meses</p>
                </div>
              </div>

              <div className="bg-[#f81200] text-white text-center py-4 rounded-full font-black text-xl hover:bg-red-700 transition-colors cursor-pointer shadow-lg">
                ¡El terreno es TUYO!
              </div>
            </div>

            {/* Espacios diseñados para disfrutar */}
            <div className="pt-10">
              <h3 className="text-3xl font-black text-center text-[#0069b7] mb-12">Espacios diseñados para disfrutar</h3>
              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {amenities.map((a, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-full border-2 border-gray-200 flex items-center justify-center text-3xl text-[#0069b7] hover:bg-[#0069b7] hover:text-white hover:border-[#0069b7] transition-all shadow-sm">
                      {a.icon}
                    </div>
                    <p className="text-[10px] font-bold text-[#0069b7] uppercase tracking-wider text-center max-w-[80px]">{a.t}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visítanos Banner Azul */}
            <div className="relative mt-16">
              <div className="absolute -top-6 -left-4 md:-left-6 z-20 bg-[#ffb700] text-[#0069b7] font-black text-2xl px-8 py-3 rounded-2xl rotate-[-5deg] shadow-lg border-2 border-white">
                VISÍTANOS
              </div>

              <div className="bg-[#0069b7] rounded-3xl flex flex-col md:flex-row items-center justify-between p-10 pt-16 md:pt-10 relative overflow-hidden shadow-xl">
                <div className="text-white md:ml-10 relative z-10 text-center md:text-left">
                  <p className="text-2xl font-black uppercase tracking-tighter mb-1">¡Coordina una visita guiada!</p>
                  <p className="text-sm font-medium opacity-90">Recorre el proyecto con nuestros asesores.</p>
                </div>
                
                <button onClick={scrollToForm} className="mt-8 md:mt-0 bg-white text-[#f81200] font-black px-10 py-5 rounded-2xl hover:bg-[#1b2a49] hover:text-white transition-all shadow-xl z-10 uppercase tracking-widest text-sm active:scale-95">
                  Agendar visita
                </button>
                
                <div className="absolute bottom-0 left-0 w-full h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMjAgTDEwIDEwIEwyMCAyMCBaIiBmaWxsPSIjMDA2OWI3Ii8+PC9zdmc+')] bg-repeat-x"></div>
              </div>
            </div>

            {/* Respaldo */}
            <div className="pt-10">
              <h3 className="text-3xl font-black text-[#0069b7] mb-2">Respaldo Creciendo Juntos</h3>
              <p className="text-gray-500 text-sm mb-8 max-w-sm">Diseñamos urbanizaciones ordenadas y planificadas con la visión de mejorar la calidad de vida de las familias peruanas.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0069b7] rounded-3xl p-8 text-white flex flex-col justify-center min-h-[200px] shadow-md">
                  <p className="text-5xl font-black text-[#ffb700]">+3</p>
                  <p className="text-xl font-bold">Años de <br/> experiencia</p>
                </div>
                <div className="bg-[#f81200] rounded-3xl p-8 text-white flex flex-col justify-center min-h-[200px] shadow-md">
                  <p className="text-5xl font-black">+6</p>
                  <p className="text-xl font-bold">Proyectos <br/> desarrollados</p>
                </div>
                <div className="bg-[#0069b7] rounded-3xl p-8 text-white flex flex-col justify-center min-h-[200px] relative overflow-hidden shadow-md">
                  <p className="text-5xl font-black text-white relative z-10">+5 mil</p>
                  <p className="text-xl font-bold relative z-10">Familias <br/> Beneficiadas</p>
                  <FaCheckCircle className="absolute -bottom-10 -right-10 text-[150px] text-white/10" />
                </div>
              </div>
            </div>

          </div>

          {/* ----- COLUMNA DERECHA: FORMULARIO STICKY (4/12) ----- */}
          <div className="lg:col-span-4 relative h-full z-40 lg:-mt-24">
            
            <div id="contacto-form" className="sticky top-28 h-fit w-full pb-10 pt-16 lg:pt-0">
              
              {/* FORMULARIO BLANCO CON LÍNEA AZUL */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-t-8 border-[#0069b7] relative"
              >
                <div className="text-center mb-6">
                  <h3 className="text-[22px] font-black text-[#0069b7] leading-tight mb-2 tracking-tight">
                    ¡Quiero conocer más de <br/> Las Terrazas!
                  </h3>
                  <p className="text-[10px] text-gray-500 font-medium">Déjanos tus datos y un asesor se contactará contigo lo antes posible.</p>
                </div>
                
                {/* 🌟 FORMULARIO AHORA USA onSubmit={handleFormSubmit} 🌟 */}
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <div>
                    {/* Se agregó el atributo name="nombre" */}
                    <input name="nombre" required type="text" placeholder="NOMBRES Y APELLIDOS*" className="w-full p-4 rounded-xl bg-white border border-gray-200 text-gray-800 font-bold text-[10px] outline-none focus:border-[#0069b7] transition-colors placeholder:text-gray-400 shadow-sm" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {/* Se agregó el atributo name="dni" */}
                    <input name="dni" required type="text" placeholder="DNI*" className="w-full p-4 rounded-xl bg-white border border-gray-200 text-gray-800 font-bold text-[10px] outline-none focus:border-[#0069b7] transition-colors placeholder:text-gray-400 shadow-sm" />
                    {/* Se agregó el atributo name="celular" */}
                    <input name="celular" required type="tel" placeholder="CELULAR*" className="w-full p-4 rounded-xl bg-white border border-gray-200 text-gray-800 font-bold text-[10px] outline-none focus:border-[#0069b7] transition-colors placeholder:text-gray-400 shadow-sm" />
                  </div>

                  <div>
                    {/* Se agregó el atributo name="email" */}
                    <input name="email" required type="email" placeholder="EMAIL*" className="w-full p-4 rounded-xl bg-white border border-gray-200 text-gray-800 font-bold text-[10px] outline-none focus:border-[#0069b7] transition-colors placeholder:text-gray-400 shadow-sm" />
                  </div>
                  
                  <div className="space-y-3 py-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input required type="checkbox" className="mt-0.5 accent-[#0069b7]" />
                      <span className="text-[9px] leading-tight text-gray-600 font-medium">He leído y acepto los <span className="text-[#0069b7] underline font-bold">Términos y condiciones</span> y la <span className="text-[#0069b7] underline font-bold">Política de Privacidad.</span></span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input required type="checkbox" className="mt-0.5 accent-[#0069b7]" />
                      <span className="text-[9px] leading-tight text-gray-600 font-medium">He leído y acepto el <span className="text-[#0069b7] underline font-bold">Consentimiento de Clientes potenciales</span>.</span>
                    </label>
                  </div>

                  {/* IMPORTANTE: No debe tener type="button", para que funcione el Submit */}
                  <button type="submit" className="w-full bg-[#f81200] hover:bg-red-700 text-white font-black py-4 rounded-xl transition-all shadow-md mt-4 text-sm uppercase tracking-widest active:scale-95">
                    ENVIAR
                  </button>
                </form>
              </motion.div>

            </div>
          </div>

        </div>
      </div>

      {/* ================= SECCIÓN: GALERÍA FULL WIDTH ================= */}
      <div className="w-full bg-[#f0f9ff] py-16 shadow-inner border-y border-blue-50 overflow-hidden mt-10">
        <div className="text-center mb-10">
        </div>
        
        <div className="flex justify-center items-center h-[350px] md:h-[500px] relative w-full max-w-[1600px] mx-auto px-4">
          
          <div className="absolute left-[-10%] md:left-[0%] w-[60%] md:w-[35%] h-[75%] opacity-40 hover:opacity-60 transition-opacity cursor-pointer z-10" onClick={prevGalleryImage}>
            <div className="w-full h-full rounded-[2rem] overflow-hidden border-[6px] border-white/50 shadow-lg bg-slate-200">
              <img src={galleryItems[getPrevIndex()].src} className="w-full h-full object-cover" onError={(e) => e.currentTarget.src = "/IMG1.jpg"} />
            </div>
            <button className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-[#0069b7] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#f81200] transition-colors z-20">
              <FaChevronLeft className="text-2xl" />
            </button>
          </div>

          <div className="relative z-30 w-[85%] md:w-[50%] h-full transition-all duration-500">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#ffb700] text-[#0069b7] font-black px-10 py-4 rounded-2xl shadow-xl uppercase tracking-tighter text-sm md:text-base z-40 text-center leading-none border-4 border-white whitespace-nowrap">
              {galleryItems[currentGalleryImage].title}
            </div>
            <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.2)] border-[8px] border-white bg-slate-200">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentGalleryImage}
                  src={galleryItems[currentGalleryImage].src}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => e.currentTarget.src = "/IMG1.jpg"}
                />
              </AnimatePresence>
            </div>
          </div>

          <div className="absolute right-[-10%] md:right-[0%] w-[60%] md:w-[35%] h-[75%] opacity-40 hover:opacity-60 transition-opacity cursor-pointer z-10" onClick={nextGalleryImage}>
            <div className="w-full h-full rounded-[2rem] overflow-hidden border-[6px] border-white/50 shadow-lg bg-slate-200">
              <img src={galleryItems[getNextIndex()].src} className="w-full h-full object-cover" onError={(e) => e.currentTarget.src = "/IMG1.jpg"} />
            </div>
            <button className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-[#0069b7] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#f81200] transition-colors z-20">
              <FaChevronRight className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= SECCIÓN: MAPA FULL WIDTH ================= */}
      <div className="w-full bg-slate-50 pt-16 pb-12">
        <div className="container mx-auto px-4 mb-8 relative z-10">
          <h3 className="text-3xl md:text-4xl font-black text-[#0069b7] mb-4 text-center tracking-tight">Tu futuro hogar te espera aquí</h3>
          <p className="text-sm text-gray-500 mb-8 text-center">Oficina de ventas de lunes a domingo. <br/> <b>Horario:</b> 9:00 a.m. a 6:00 p.m.</p>
          
          <div className="flex justify-center -mb-20">
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm text-center border-t-4 border-[#f81200]">
              <FaHome className="text-[#0069b7] text-4xl mx-auto mb-3" />
              <p className="text-[#0069b7] font-black text-xl uppercase mb-1">Proyecto</p>
              <p className="text-xs text-gray-500 mb-6 font-bold">Km 81 Panamericana Sur, San Antonio</p>
              <a 
                href="https://maps.app.goo.gl/i8E64hMcvQ4p8HGq7" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="border-2 border-[#0069b7] text-[#0069b7] font-black text-sm px-6 py-3 rounded-xl w-full flex justify-center items-center gap-2 hover:bg-[#0069b7] hover:text-white transition-colors"
              >
                <FaMap /> Cómo llegar
              </a>
            </div>
          </div>
        </div>

        <div className="w-full h-[550px] shadow-inner border-y border-gray-200 relative z-0 mt-8">
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4618.014225080223!2d-76.66969782417476!3d-12.639944053230167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91057100696e569b%3A0x1ed9187ba556a871!2sLas%20Terrazas%20de%20San%20Antonio!5e1!3m2!1ses-419!2spe!4v1775942798372!5m2!1ses-419!2spe" 
             className="w-full h-full border-0" 
             allowFullScreen 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
           />
        </div>
      </div>

      {/* WHATSAPP FLOTANTE */}
      <motion.a 
        href="https://wa.me/51958083134" target="_blank" 
        className="fixed bottom-8 right-8 z-[100] bg-[#25d366] text-white p-5 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] text-3xl hover:scale-110 transition-transform"
      >
        <FaWhatsapp />
      </motion.a>

      {/* FOOTER ELIMINADO PARA QUE SE MUESTRE EL GLOBAL DE LA PÁGINA */}
    </div>
  );
}