"use client";
import { useState } from "react";
import { FaCheckCircle, FaChevronDown } from "react-icons/fa";

interface FormSectionProps {
  onOpenLegal: (type: 'datos' | 'comercial') => void;
  onSuccess: () => void;
}

export default function FormSection({ onOpenLegal, onSuccess }: FormSectionProps) {
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '', apellidos: '', documento: '', telefono: '', email: '', proyecto: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const URL = "https://script.google.com/macros/s/AKfycbzZTZg1G0rJhNZZOjgKMfBPmHc9vtp-kiHVukIV6hlvx5XMH0q_aDBZQIxI_WpnVbXfXw/exec";
    try {
      const params = new URLSearchParams(formData);
      await fetch(`${URL}?${params.toString()}`, { method: "POST", mode: "no-cors" });
      setFormStep(2);
      onSuccess(); 
    } catch (error) {
      alert("Error al enviar información.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="formulario" className="relative font-montserrat bg-cover bg-bottom bg-no-repeat w-full py-12 lg:py-32 flex items-center scroll-mt-24" style={{ backgroundImage: "url('/IMG_FOR/FONDO_FOR5.png')" }}>
      <div className="container mx-auto px-4 w-full flex justify-center lg:justify-end lg:pr-12">
        <div className="w-full max-w-[480px] bg-[#0069b3] border-[6px] border-white rounded-[2rem] p-8 shadow-2xl text-white min-h-[450px] flex flex-col justify-start">
          
          {/* STEPPER DINÁMICO */}
          <div className="flex justify-center items-center gap-2 mb-8 mt-2">
            <div className={`w-6 h-6 rounded-full font-black flex items-center justify-center text-xs ${formStep === 1 ? 'bg-[#e40139] text-white' : 'bg-[#10b981] text-white'}`}>
              1
            </div>
            <div className="w-12 h-[2px] bg-white opacity-50"></div>
            <div className={`w-6 h-6 rounded-full font-black flex items-center justify-center text-xs ${formStep === 2 ? 'bg-[#e40139] text-white' : 'bg-white text-[#0069b3]'}`}>
              2
            </div>
          </div>

          {formStep === 1 ? (
            <>
              <h3 className="text-2xl font-bold text-center mb-6">Quiero recibir información</h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input required type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Nombre*" 
                    className="p-3 rounded-xl text-gray-800 bg-white focus:outline-none text-sm" />
                  <input required type="text" name="apellidos" value={formData.apellidos} onChange={handleInputChange} placeholder="Apellidos*" 
                    className="p-3 rounded-xl text-gray-800 bg-white focus:outline-none text-sm" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <input required type="text" name="documento" value={formData.documento} onChange={handleInputChange} placeholder="Nro. de documento*" 
                    className="p-3 rounded-xl text-gray-800 bg-white focus:outline-none text-sm" />
                  <div className="flex bg-white rounded-xl overflow-hidden">
                    <div className="bg-white text-gray-800 flex items-center gap-1 px-3 text-sm border-r border-gray-100">+51 <FaChevronDown className="text-[10px]" /></div>
                    <input required type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} placeholder="Teléfono*" 
                      className="p-3 flex-grow text-gray-800 focus:outline-none text-sm" />
                  </div>
                </div>

                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Correo electrónico*" 
                  className="w-full p-3 rounded-xl text-gray-800 bg-white focus:outline-none text-sm" />
                
                <div className="relative">
                  <select required name="proyecto" value={formData.proyecto} onChange={handleInputChange} 
                    className="w-full p-3 rounded-xl text-gray-800 bg-white focus:outline-none appearance-none text-sm cursor-pointer">
                    <option value="">Seleccione un proyecto*</option>
                    <option value="Sol de Huaral">Sol de Huaral</option>
                    <option value="Las Terrazas de San Antonio">Las Terrazas de San Antonio</option>
                  </select>
                  <FaChevronDown className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                <div className="space-y-3 pt-3">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input required type="checkbox" className="mt-1" />
                    <span onClick={(e) => { e.preventDefault(); onOpenLegal('datos'); }}
                      className="text-[10px] md:text-xs text-white font-light underline cursor-pointer">
                      He leído y acepto el Tratamiento de mis datos personales.
                    </span>
                  </label>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input required type="checkbox" className="mt-1" />
                    <span onClick={(e) => { e.preventDefault(); onOpenLegal('comercial'); }}
                      className="text-[10px] md:text-xs text-white font-light underline cursor-pointer">
                      He leído y acepto la Política para envío de comunicaciones comerciales.
                    </span>
                  </label>
                </div>

                <button disabled={isSubmitting} type="submit" className="w-full bg-[#e40139] text-white py-4 rounded-xl font-bold uppercase text-base hover:bg-[#c30132] transition-all shadow-lg">
                  {isSubmitting ? "Enviando..." : "SOLICITAR INFORMACIÓN"}
                </button>
              </form>
            </>
          ) : (
            /* PASO 2: IDÉNTICO A TU IMAGEN */
            <div className="flex flex-col items-center justify-center text-center flex-grow pb-10 animate-in zoom-in duration-500">
              <div className="w-24 h-24 rounded-full bg-[#10b981] flex items-center justify-center shadow-lg mb-8 border-4 border-white">
                <FaCheckCircle className="text-white text-7xl" />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-wide text-white">¡Información enviada!</h3>
              <p className="text-base text-gray-100 font-medium px-4">
                En breve un asesor se pondrá en contacto con usted para brindarle más información.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}