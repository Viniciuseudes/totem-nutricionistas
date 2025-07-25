"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [showAttention, setShowAttention] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAttention(true);
      setTimeout(() => setShowAttention(false), 1500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full p-3 relative overflow-hidden bg-gradient-to-br from-green-50 to-teal-50">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 text-green-300 opacity-30"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              rotate: 0,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, "-100%"],
              rotate: 360,
              transition: {
                duration: Math.random() * 20 + 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
            }}
          >
            <Sparkles />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.div
          className="mb-4 p-4 bg-gradient-to-br from-green-400 to-teal-600 rounded-full shadow-lg"
          animate={{
            scale: showAttention ? [1, 1.1, 1] : 1,
            boxShadow: showAttention
              ? "0 0 60px rgba(52, 211, 153, 0.8)"
              : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles size={50} className="text-white" />
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold mb-3 text-gray-800"
          animate={{
            scale: showAttention ? [1, 1.05, 1] : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          Ei Dr.<sup>(a)</sup>, seja você um{" "}
          <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
            especialista Fusion
          </span>
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-base mb-6 text-gray-600 max-w-md font-medium">
            Junte-se à nossa comunidade de especialistas e transforme vidas.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="text-lg font-bold px-8 py-6 rounded-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300 group tracking-wider"
          >
            CLIQUE AQUI
            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
