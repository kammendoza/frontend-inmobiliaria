"use client";

import { SOCIAL_LINKS } from "../../data/constants";
import {
  FaFacebookF,
  FaTiktok,
  FaInstagram,
  FaRegUserCircle,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface HeaderProps {
  onShowProjects: () => void;
  onShowHome: () => void;
  currentView: string;
}

export default function Header({
  onShowProjects,
  onShowHome,
  currentView,
}: HeaderProps) {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navigateTo = (path: string) => {
    if (typeof window === "undefined") return;

    // Si estamos en una página de detalle (ej: /proyecto-sol-de-huaral)
    if (pathname !== "/") {
      // Usamos router.push para volver al home con el hash correspondiente
      // Esto permite que page.tsx detecte el hash al cargar
      router.push(path);
      return;
    }

    // SI YA ESTAMOS EN HOME, manejamos los estados internos
    if (path.includes("#proyectos")) {
      onShowProjects();
      window.location.hash = "proyectos";
    } else if (path.includes("#nosotros")) {
      // Cambiamos el hash para que el useEffect de page.tsx lo detecte
      window.location.hash = "historia";
    } else if (path.includes("#formulario")) {
      const section = document.getElementById("formulario");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.hash = "formulario";
      }
    } else {
      // Si es "/" o "inicio"
      onShowHome();
      window.location.hash = "inicio";
    }
  };

  // Verificamos si el Inicio debe estar resaltado
  const isHomeActive =
    isClient &&
    currentView === "home" &&
    pathname === "/";

  return (
    <header className="fixed top-0 left-0 w-full z-50 font-montserrat">
      {/* Barra Superior */}
      <div className="bg-[#0069b3] text-white py-1.5 px-4 md:px-12 flex justify-end items-center text-xs">
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-gray-200 transition-colors">
            Sé un Asesor
          </a>

          <div className="flex gap-4 text-sm">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaFacebookF />
            </a>

            <a
              href={SOCIAL_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaTiktok />
            </a>

            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaInstagram />
            </a>
          </div>

          <a
            href="#"
            className="flex items-center gap-1 hover:text-gray-200 border-l border-white/30 pl-6 transition-colors"
          >
            <FaRegUserCircle className="text-sm" /> Mi CJ
          </a>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-black/40 text-white py-4 px-4 md:px-12 flex justify-between items-center border-b border-white/10 backdrop-blur-sm">
        <button
          onClick={() => navigateTo("/")}
          className="flex items-center gap-2 text-xl font-bold hover:opacity-80 transition-opacity"
        >
          <img src="/LOGOS/LOGO_BLANCO.png" alt="Logo" className="h-8 w-auto" />
          <span className="tracking-tight">Creciendo Juntos</span>
        </button>

        <div className="flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => navigateTo("/")}
            className={`transition-all ${
              isHomeActive
                ? "text-yellow-400 font-bold scale-105"
                : "hover:text-yellow-400"
            }`}
          >
            Inicio
          </button>

          <button
            onClick={() => navigateTo("/#proyectos")}
            className={`transition-all ${
              currentView === "projects"
                ? "text-yellow-400 font-bold scale-105"
                : "hover:text-yellow-400"
            }`}
          >
            Proyectos
          </button>

          <button
            onClick={() => navigateTo("/#nosotros")}
            className={`transition-all ${
              currentView === "nosotros"
                ? "text-yellow-400 font-bold scale-105"
                : "hover:text-yellow-400"
            }`}
          >
            Nosotros
          </button>

          <button
            onClick={() => navigateTo("/#formulario")}
            className="hover:text-yellow-400 transition-colors"
          >
            Más información
          </button>
        </div>
      </nav>
    </header>
  );
}