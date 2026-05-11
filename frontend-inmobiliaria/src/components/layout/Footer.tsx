// src/components/layout/Footer.tsx
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { SOCIAL_LINKS } from "../../data/constants";

export default function Footer() {
  return (
    <footer className="bg-[#0b1121] text-white font-montserrat pt-16 pb-8 relative z-50">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="flex justify-center lg:justify-start items-center">
            <img src="/LOGOS/LOGO_BLANCO.png" alt="Logo" className="w-25 h-auto" />
          </div>
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
            <div className="flex gap-5 text-[#008cff]">
              <a href={SOCIAL_LINKS.facebook} target="_blank" className="hover:text-white transition-all text-2xl"><FaFacebookF /></a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" className="hover:text-white transition-all text-2xl"><FaInstagram /></a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" className="hover:text-white transition-all text-2xl"><FaTiktok /></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Horarios</h4>
            <ul className="space-y-4 text-sm text-gray-300 font-light">
              <li>Lun – Vie: 9:00 AM - 6:00 PM</li>
              <li>Sáb - Dom: Visitas Guiadas</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ========================================= */}
        {/* LÍNEA DE COPYRIGHT AÑADIDA AQUÍ ABAJO */}
        {/* ========================================= */}
        <div className="border-t border-white/10 pt-6 text-center text-gray-400 text-xs tracking-wide">
          <p>© 2026 Creciendo Juntos. Todos los derechos reservados.</p>
        </div>
    </footer>
  );
}