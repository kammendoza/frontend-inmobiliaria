"use client";
import React from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmationModal({ isOpen, onClose }: ConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white w-full max-w-md p-12 shadow-2xl rounded-[40px] border border-gray-100 flex flex-col items-center text-center"
          >
            <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-[#e40139] transition-colors">
              <FaTimes size={24} />
            </button>
            <div className="mb-8 p-4 bg-green-50 rounded-full">
              <FaCheckCircle className="text-6xl text-[#10b981]" />
            </div>
            <h2 className="font-montserrat text-3xl font-black text-[#0069b3] mb-4 italic uppercase tracking-tighter">
              ¡Solicitud Enviada!
            </h2>
            <p className="font-montserrat text-gray-500 leading-relaxed mb-10 text-sm">
              Gracias por tu interés. Un asesor de <strong>Creciendo Juntos</strong> se pondrá en contacto contigo vía WhatsApp o llamada en los próximos minutos.
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-[#0069b3] text-white font-black py-5 rounded-2xl shadow-xl hover:bg-[#e40139] transition-all uppercase tracking-widest text-xs"
            >
              Entendido
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}