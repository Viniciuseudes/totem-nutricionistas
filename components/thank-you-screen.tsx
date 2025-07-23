"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Gift, Home, AlertTriangle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface ThankYouScreenProps {
  onReset: () => void;
  saveStatus: "idle" | "saving" | "success" | "error";
}

export function ThankYouScreen({ onReset, saveStatus }: ThankYouScreenProps) {
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    if (countdown <= 0) {
      onReset();
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, onReset]);

  return (
    <div className="flex flex-col items-center justify-center h-full p-3 relative overflow-hidden bg-gradient-to-br from-green-50 to-teal-50">
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `rgb(${Math.floor(
                Math.random() * 100 + 100
              )}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(
                Math.random() * 100 + 100
              )})`,
              left: `${Math.random() * 100}%`,
              top: "-5%",
            }}
            initial={{ y: "-10%" }}
            animate={{
              y: "110%",
              x: [0, Math.random() * 100 - 50],
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 3 + 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: Math.random() * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.6,
        }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.div
          className={`mb-3 p-3 ${
            saveStatus === "error"
              ? "bg-gradient-to-br from-red-400 to-red-600"
              : saveStatus === "saving"
              ? "bg-gradient-to-br from-blue-400 to-blue-600"
              : "bg-gradient-to-br from-green-400 to-green-600"
          } rounded-full shadow-lg`}
        >
          {saveStatus === "error" ? (
            <AlertTriangle size={40} className="text-white" />
          ) : saveStatus === "saving" ? (
            <Loader2 size={40} className="text-white animate-spin" />
          ) : (
            <CheckCircle size={40} className="text-white" />
          )}
        </motion.div>

        <motion.h1
          className={`text-2xl font-extrabold mb-4 bg-clip-text text-transparent ${
            saveStatus === "error"
              ? "bg-gradient-to-r from-red-500 to-orange-500"
              : "bg-gradient-to-r from-green-500 to-teal-500"
          }`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {saveStatus === "error"
            ? "Ops! Algo deu errado."
            : "CADASTRO REALIZADO!"}
        </motion.h1>

        {saveStatus !== "saving" && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-4 w-full max-w-sm"
          >
            <div className="flex flex-col items-center justify-center p-4 bg-yellow-100 rounded-lg border-2 border-dashed border-yellow-400 shadow-inner">
              <Gift className="text-yellow-600 mb-2 h-8 w-8" />
              <p className="text-sm font-bold text-yellow-800 mb-1">
                VOUCHER ESPECIAL
              </p>
              <p className="text-center text-lg font-bold text-gray-800">
                Você ganhou 1 hora grátis em uma das salas Fusion!
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Apresente este totem na recepção.
              </p>
            </div>
          </motion.div>
        )}

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-xs mb-4 text-gray-700 max-w-md"
        >
          {saveStatus === "error"
            ? "Não foi possível salvar seus dados. Por favor, tente novamente."
            : saveStatus === "saving"
            ? "Aguarde, estamos salvando seus dados..."
            : "Agradecemos seu interesse! Entraremos em contato em breve."}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onReset}
            size="default"
            className="text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Home className="mr-1.5 h-3.5 w-3.5" />
            Voltar ao início
          </Button>
        </motion.div>

        <motion.div
          className="mt-2 text-gray-500 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Retornando em {countdown} segundos...
        </motion.div>
      </motion.div>
    </div>
  );
}
