"use client";

import { useState, useEffect } from "react";
// Imports corregidos para tu estructura actual
import Header from "@/components/layout/Header";
import LotSearchForm from "@/components/sections/LotSearchForm";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import BounceCards from "@/components/ui/BounceCards/BounceCards";
import { FaShieldAlt, FaHandHoldingUsd, FaCheckCircle, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaTiktok, FaTimes } from "react-icons/fa";
import TrueFocus from "@/components/ui/TrueFocus/TrueFocus";
import BorderGlow from "@/components/ui/BorderGlow/BorderGlow";
import NuestraHistoria from "@/components/sections/NuestraHistoria";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/swiper-bundle.css';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [view, setView] = useState("home");
  const [showPromo, setShowPromo] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStep, setFormStep] = useState(1); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '', apellidos: '', documento: '', telefono: '', email: '', proyecto: ''
  });

  const [showLegalModal, setShowLegalModal] = useState(false);
  const [legalContent, setLegalContent] = useState({ title: "", text: "" });

  // --- LÓGICA DE PERSISTENCIA Y MONTAJE ---
  useEffect(() => {
    const syncViewWithHash = () => {
      const hash = window.location.hash;
      // Sincroniza el estado view con el hash de la URL (botón atrás/adelante)
      if (hash === "#proyectos") {
        setView("projects");
      } else if (hash === "#historia" || hash === "#nosotros") {
        setView("nosotros");
      } else {
        setView("home");
      }
      window.scrollTo(0, 0);
    };

    // Escuchar cambios de hash para navegación del navegador
    window.addEventListener("hashchange", syncViewWithHash);
    
    syncViewWithHash();
    setIsMounted(true);

    return () => window.removeEventListener("hashchange", syncViewWithHash);
  }, []);

  // --- LÓGICA DEL POPUP PROMOCIONAL ---
  useEffect(() => {
    if (isMounted && view === "home") {
      const timer = setTimeout(() => setShowPromo(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setShowPromo(false);
    }
  }, [isMounted, view]);

  // 🌟 CORRECCIÓN: El return debe ir DESPUÉS de todos los useEffect 
  // para cumplir con las reglas de Hooks de React y evitar la página en blanco.
  if (!isMounted) return <div className="min-h-screen bg-white" />;

  // --- FUNCIÓN DE NAVEGACIÓN INTELIGENTE ---
  const handleViewChange = (newView: string) => {
    const hashes: Record<string, string> = {
      home: "#inicio",
      projects: "#proyectos",
      nosotros: "#historia"
    };

    window.location.hash = hashes[newView] || "#inicio";
  };

  const images = [
    "/IMG_CLIENTES/cliente5.jpeg", "/IMG_CLIENTES/cliente2.jpeg", "/IMG_CLIENTES/cliente3.jpeg",
    "/IMG_CLIENTES/cliente1.jpeg", "/IMG_CLIENTES/cliente4.jpeg"
  ];

  const transformStyles = [
    "rotate(5deg) translate(-150px)", "rotate(0deg) translate(-70px)", "rotate(-5deg)",
    "rotate(5deg) translate(70px)", "rotate(-5deg) translate(150px)"
  ];

  const whatsappNumber = "51958083134";
  const whatsappPromoMessage = "Hola,%20vengo%20de%20la%20página%20web%20y%20quisiera%20más%20información%20sobre%20sus%20proyectos.";

  const socialLinks = {
    facebook: "https://www.facebook.com/profile.php?id=100088268954668",
    instagram: "https://www.instagram.com/creciendojuntosinmobiliaria/",
    tiktok: "https://www.tiktok.com/@creciendojuntos.inmb?lang=en"
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openLegal = (type: 'datos' | 'comercial') => {
    if (type === 'datos') {
      setLegalContent({
        title: "Tratamiento de Datos Personales",
        text: "De conformidad con la Ley N° 29733, informamos que sus datos serán almacenados en nuestro banco de datos para gestionar su solicitud de información inmobiliaria y brindarle una atención personalizada. Creciendo Juntos garantiza la seguridad y confidencialidad de su información."
      });
    } else {
      setLegalContent({
        title: "Política de Comunicaciones",
        text: "Al aceptar esta política, usted autoriza a Creciendo Juntos a enviarle información sobre nuevos proyectos, ofertas exclusivas y novedades a través de correos electrónicos, llamadas telefónicas o mensajes de WhatsApp."
      });
    }
    setShowLegalModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzZTZg1G0rJhNZZOjgKMfBPmHc9vtp-kiHVukIV6hlvx5XMH0q_aDBZQIxI_WpnVbXfXw/exec";

    try {
      const queryParams = new URLSearchParams();
      queryParams.append("nombre", formData.nombre);
      queryParams.append("apellidos", formData.apellidos);
      queryParams.append("documento", formData.documento);
      queryParams.append("telefono", formData.telefono);
      queryParams.append("email", formData.email);
      queryParams.append("proyecto", formData.proyecto);

      await fetch(`${GOOGLE_SCRIPT_URL}?${queryParams.toString()}`, {
        method: "POST",
        mode: "no-cors",
      });

      setIsModalOpen(true);
      setFormData({ nombre: '', apellidos: '', documento: '', telefono: '', email: '', proyecto: '' });
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al enviar la información. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden font-montserrat bg-white flex flex-col">
      
      {isMounted && <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}

      {isMounted && showPromo && view === "home" && (
        <div className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-500 backdrop-blur-sm">
          <div className="relative w-full max-w-lg flex flex-col items-center animate-in zoom-in-95 duration-500 delay-150">
            <button 
              onClick={() => setShowPromo(false)}
              className="absolute -top-5 -right-5 md:-top-6 md:-right-6 w-10 h-10 bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-200 hover:scale-110 transition-all z-10 border border-gray-200"
            >
              <FaTimes className="text-lg" />
            </button>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${whatsappPromoMessage}`}
              target="_blank" rel="noopener noreferrer" onClick={() => setShowPromo(false)} 
              className="block w-full rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-all duration-300 bg-transparent"
            >
              <img src="/IMG_PROMO/promo.jpg" alt="Promoción" className="w-full h-auto object-cover" onError={(e) => { e.currentTarget.src = "/IMG1.jpg" }} />
            </a>
          </div>
        </div>
      )}

      {isMounted && showLegalModal && (
        <div className="fixed inset-0 z-[300] bg-black/60 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <h3 className="text-[#0069b3] font-bold text-xl mb-4">{legalContent.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {legalContent.text}
            </p>
            <button 
              onClick={() => setShowLegalModal(false)}
              className="w-full bg-[#0069b3] text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      <Header 
        onShowProjects={() => handleViewChange("projects")} 
        onShowHome={() => handleViewChange("home")} 
        currentView={view} 
      />

      <div className="flex-grow">
        {isMounted && view === "home" && (
          <div className="animate-in fade-in duration-500">
            
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
                  Lotes urbanizados con seguridad legal, financiamiento y ubicación estratégica. ¡Haz realidad tu sueño de tener tu propio terreno!
                </p>
                <LotSearchForm />
              </div>
            </section>

            <section id="nosotros" className="py-28 w-full relative z-10 font-montserrat bg-white">
              <div className="container mx-auto px-4 md:px-12">
                <div className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 flex justify-center font-montserrat">
                  <TrueFocus sentence="SOBRE NOSOTROS" manualMode={false} blurAmount={2.5} borderColors={['#e40139', '#0069b3']} glowColors={['rgba(228, 1, 57, 0.4)', 'rgba(0, 105, 179, 0.4)']} wordColors={['#e40139', '#0069b3']} animationDuration={0.6} pauseBetweenAnimations={1.5} />
                </div>
                <BorderGlow className="w-full" edgeSensitivity={30} backgroundColor="#ffffff" borderRadius={32} glowRadius={40} glowIntensity={1} coneSpread={25} animated={false} colors={['#0069b3', '#e40139']}>
                    <div className="bg-white rounded-[2rem] shadow-xl p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-16 border border-gray-100 relative z-10">
                      <div className="flex-1 text-center lg:text-left">
                        <span className="inline-block px-4 py-1.5 bg-[#e0f2fe] text-[#0069b3] rounded-full text-xs font-bold uppercase tracking-widest mb-4">Nuestra Esencia</span>
                        <p className="text-gray-600 leading-relaxed mb-12 font-medium">Somos una empresa peruana líder, comprometida con el desarrollo urbano y el bienestar de las familias. Nos especializamos en ofrecer proyectos inmobiliarios con ubicaciones estratégicas.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-12 text-left">
                          <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-[#0069b3]/10 flex items-center justify-center border-2 border-[#0069b3]/20"><FaShieldAlt className="text-[#0069b3] text-xl" /></div><div><p className="text-sm font-bold text-gray-900">Seguridad Jurídica</p></div></div>
                          <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-[#e40139]/10 flex items-center justify-center border-2 border-[#e40139]/20"><FaHandHoldingUsd className="text-[#e40139] text-xl" /></div><div><p className="text-sm font-bold text-gray-900">Crédito Flexible</p></div></div>
                        </div>
                        <button 
                          onClick={() => handleViewChange("nosotros")}
                          className="px-8 py-4 bg-[#e40139] text-white font-bold rounded-xl shadow-lg hover:bg-red-700 hover:scale-105 transition-all uppercase tracking-widest text-sm font-montserrat"
                        >
                          Conoce nuestra historia
                        </button>
                      </div>
                      <div className="flex-1 flex justify-center w-full overflow-hidden">
                        <div className="relative w-full flex items-center justify-center min-h-[350px]">
                          <BounceCards images={images} containerWidth={500} containerHeight={300} animationDelay={0.5} animationStagger={0.08} transformStyles={transformStyles} />
                        </div>
                      </div>
                    </div>
                </BorderGlow>
              </div>
            </section>

            <section className="relative py-20 w-full overflow-hidden z-10 font-montserrat bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/FONDO_C.jpg')" }}>
              <div className="container mx-auto px-4 relative z-10">
                <Swiper grabCursor={true} loop={true} spaceBetween={24} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} autoplay={{ delay: 3000, disableOnInteraction: false }} modules={[Autoplay, Navigation]} className="w-full py-4">
                  <SwiperSlide><div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative border border-white/10 group"><img src="/IMG1.jpg" alt="P1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div></SwiperSlide>
                  <SwiperSlide><div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative border border-white/10 group"><img src="/IMG2.jpg" alt="P2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div></SwiperSlide>
                  <SwiperSlide><div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative border border-white/10 group"><img src="/IMG3.jpg" alt="P3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div></SwiperSlide>
                  <SwiperSlide><div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative border border-white/10 group"><img src="/IMG4.jpg" alt="P4" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div></SwiperSlide>
                </Swiper>
              </div>
            </section>

            <section id="formulario" className="relative font-montserrat bg-cover bg-bottom bg-no-repeat w-full py-12 lg:py-46 flex items-center scroll-mt-24" style={{ backgroundImage: "url('/IMG_FOR/FONDO_FOR5.png')" }}>
              <div className="container mx-auto px-4 relative z-10 w-full flex items-center">
                <div className="w-full flex justify-center lg:justify-end lg:pr-12 xl:pr-24">
                  <div className="w-full max-w-[480px] bg-[#0069b3] border-[6px] border-white rounded-[2rem] p-8 shadow-2xl text-white min-h-[450px] flex flex-col">
                    <div className="flex justify-center items-center gap-2 mb-4">
                      <div className={`w-6 h-6 rounded-full font-black flex items-center justify-center text-xs ${formStep === 1 ? 'bg-[#e40139] text-white' : 'bg-[#10b981] text-white'}`}>1</div>
                      <div className="w-12 h-[2px] bg-white opacity-50"></div>
                      <div className={`w-6 h-6 rounded-full font-black flex items-center justify-center text-xs ${formStep === 2 ? 'bg-[#e40139] text-white' : 'bg-white text-[#0069b3]'}`}>2</div>
                    </div>

                    {formStep === 1 ? (
                      <>
                        <h3 className="text-2xl font-bold text-center mb-6 tracking-wide text-white">Quiero recibir información</h3>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <input required type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Nombre*" className="w-full px-3 py-3 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#e40139] text-sm" />
                            <input required type="text" name="apellidos" value={formData.apellidos} onChange={handleInputChange} placeholder="Apellidos*" className="w-full px-3 py-3 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#e40139] text-sm" />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input required type="text" name="documento" value={formData.documento} onChange={handleInputChange} placeholder="DNI*" className="w-full px-3 py-3 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#e40139] text-sm" />
                            <div className="flex bg-white rounded-xl overflow-hidden">
                              <select className="bg-transparent text-gray-800 px-2 text-sm"><option>+51</option></select>
                              <input required type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} placeholder="Teléfono*" className="w-full px-3 py-3 text-gray-800 bg-white focus:outline-none text-sm" />
                            </div>
                          </div>
                          <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email*" className="w-full px-3 py-3 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#e40139] text-sm" />
                          <div className="relative">
                            <select required name="proyecto" value={formData.proyecto} onChange={handleInputChange} className="w-full px-3 py-3 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#e40139] appearance-none text-sm cursor-pointer">
                              <option value="">Seleccione un proyecto*</option>
                              <option value="Las Terrazas de San Antonio">Las Terrazas de San Antonio</option>
                              <option value="Sol de Huaral">Sol de Huaral</option>
                            </select>
                          </div>

                          <div className="space-y-3 pt-3">
                            <label className="flex items-start gap-2.5 cursor-pointer group">
                              <input required type="checkbox" className="mt-1" />
                              <span 
                                onClick={(e) => { e.preventDefault(); openLegal('datos'); }}
                                className="text-[10px] md:text-xs text-white font-light underline cursor-pointer hover:text-gray-200"
                              >
                                Tratamiento de mis datos personales.
                              </span>
                            </label>
                            <label className="flex items-start gap-2.5 cursor-pointer group">
                              <input required type="checkbox" className="mt-1" />
                              <span 
                                onClick={(e) => { e.preventDefault(); openLegal('comercial'); }}
                                className="text-[10px] md:text-xs text-white font-light underline cursor-pointer hover:text-gray-200"
                              >
                                Política para envío de comunicaciones comerciales.
                              </span>
                            </label>
                          </div>

                          <button disabled={isSubmitting} type="submit" className="w-full bg-[#e40139] text-white font-bold text-sm py-4 mt-2 rounded-xl hover:bg-red-700 transition-all uppercase shadow-lg disabled:opacity-50">
                            {isSubmitting ? "Enviando..." : "Solicitar información"}
                          </button>
                        </form>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center py-10 animate-in zoom-in duration-500">
                        <FaCheckCircle className="text-[#10b981] text-7xl mb-6 shadow-sm rounded-full bg-white" />
                        <h3 className="text-2xl font-bold mb-4 tracking-wide">¡Información enviada!</h3>
                        <p className="text-base text-gray-100 font-medium">En breve un asesor se pondrá en contacto con usted.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="py-24 bg-[#f8fafc] font-montserrat w-full relative z-10 border-t border-gray-100">
              <div className="container mx-auto px-4 md:px-12 max-w-7xl">
                <div className="text-center mb-16"><span className="inline-block px-4 py-1.5 bg-[#e0f2fe] text-[#0069b3] rounded-full text-xs font-bold uppercase tracking-widest mb-4">Galería</span><h2 className="text-3xl md:text-4xl font-bold text-[#0069b3]">Descubre nuestros <span className="text-[#e40139]">Proyectos</span></h2></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group flex flex-col h-full"><div className="relative w-full aspect-video bg-black flex justify-center"><video controls playsInline preload="metadata" className="w-full h-full object-contain"><source src="/VIDEOS/video1.mp4" type="video/mp4" /></video></div><div className="p-6 text-center flex-grow flex flex-col justify-center"><h4 className="font-bold text-[#0069b3] text-xl">Avance de Obra</h4><p className="text-sm text-gray-500 mt-2">Conoce los detalles de nuestro último proyecto.</p></div></div>
                  <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group flex flex-col h-full"><div className="relative w-full aspect-video bg-black flex justify-center"><video controls playsInline preload="metadata" className="w-full h-full object-contain"><source src="/VIDEOS/video2.mp4" type="video/mp4" /></video></div><div className="p-6 text-center flex-grow flex flex-col justify-center"><h4 className="font-bold text-[#0069b3] text-xl">Promoción</h4><p className="text-sm text-gray-500 mt-2">Contáctanos y cumple el sueño de un hogar propio.</p></div></div>
                  <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group flex flex-col h-full"><div className="relative w-full aspect-video bg-black flex justify-center"><video controls playsInline preload="metadata" className="w-full h-full object-contain"><source src="/VIDEOS/video3.mp4" type="video/mp4" /></video></div><div className="p-6 text-center flex-grow flex flex-col justify-center"><h4 className="font-bold text-[#0069b3] text-xl">Aniversario</h4><p className="text-sm text-gray-500 mt-2">¡Gracias por permitirnos ser parte de su historia!</p></div></div>
                </div>
              </div>
            </section>

          </div>
        )}

        {isMounted && view === "projects" && (
          <div className="relative min-h-screen bg-white animate-in fade-in duration-500">
            <div className="relative h-[170px] flex items-center justify-center">
              <img src="/proyectos/Int1.jpg" className="absolute inset-0 w-full h-full object-cover brightness-50" alt="Banner Proyectos" />
              <div className="relative z-10 flex items-center gap-3 mt-16 font-montserrat">
              </div>
            </div>
            <FeaturedProjects />
          </div>
        )}

        {isMounted && view === "nosotros" && (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
            <NuestraHistoria onBack={() => handleViewChange("home")} onGoToProjects={() => handleViewChange("projects")} />
          </div>
        )}
      </div>

      <footer className="bg-[#0b1121] text-white font-montserrat pt-16 pb-8 relative z-50">
        <div className="container mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="flex justify-center lg:justify-start items-center"><img src="/LOGOS/LOGO_BLANCO.png" alt="Logo" className="w-25 h-auto" /></div>
            <div>
              <h4 className="font-bold text-lg mb-6">Contacto</h4>
              <ul className="space-y-4 text-sm text-gray-300 font-light">
                <li className="flex items-center gap-3"><FaPhoneAlt className="text-[#008cff] text-lg flex-shrink-0" /><span>+51 958 083 134</span></li>
                <li className="flex items-center gap-3"><FaEnvelope className="text-[#008cff] text-lg flex-shrink-0" /><span>creciendojuntoscona@gmail.com</span></li>
                <li className="flex items-center gap-3"><FaMapMarkerAlt className="text-[#008cff] text-lg flex-shrink-0" /><span>Los Olivos - Perú</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Síguenos</h4>
              <div className="flex gap-5">
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-[#008cff] hover:text-white hover:scale-110 transition-all text-2xl"><FaFacebookF /></a>
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-[#008cff] hover:text-white hover:scale-110 transition-all text-2xl"><FaInstagram /></a>
                <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-[#008cff] hover:text-white hover:scale-110 transition-all text-2xl"><FaTiktok /></a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Horarios</h4>
              <ul className="space-y-4 text-sm text-gray-300 font-light">
                <li>Lun – Vie: 9:00 AM - 6:00 PM</li>
                <li>Sáb: Visitas Guiadas</li>
                <li>Dom: Visitas Guiadas</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-400 font-light tracking-wide">© 2026 Creciendo Juntos. Todos los derechos reservados.</div>
        </div>
      </footer>

    </main>
  );
}