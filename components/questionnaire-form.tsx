"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, User, Instagram, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  nomeCompleto: string;
  instagram: string;
  whatsapp: string;
}

interface QuestionnaireFormProps {
  onSubmit: (data: FormData) => void;
  initialData: FormData;
}

export function QuestionnaireForm({
  onSubmit,
  initialData,
}: QuestionnaireFormProps) {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.nomeCompleto.trim()) {
      newErrors.nomeCompleto = "Nome completo é obrigatório";
    }
    if (!formData.instagram.trim()) {
      newErrors.instagram = "Instagram é obrigatório";
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp é obrigatório";
    } else if (!/^\d{10,11}$/.test(formData.whatsapp.replace(/\D/g, ""))) {
      newErrors.whatsapp = "Número de WhatsApp inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const formatWhatsApp = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 11);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-green-50 to-white">
      <div className="p-4 bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-md">
        <h2 className="text-2xl font-extrabold text-center">
          Cadastro de Especialista
        </h2>
        <p className="text-center text-sm opacity-90">
          Preencha seus dados para começar
        </p>
      </div>

      <div className="p-4 flex-grow flex flex-col justify-between">
        <form
          onSubmit={handleSubmit}
          className="h-full flex flex-col justify-between"
        >
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="flex-grow flex flex-col"
          >
            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 mb-4 flex-grow">
              <div className="space-y-6">
                <div>
                  <Label
                    htmlFor="nomeCompleto"
                    className="flex items-center text-sm font-medium text-gray-700 mb-1"
                  >
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    Nome Completo
                  </Label>
                  <Input
                    id="nomeCompleto"
                    type="text"
                    placeholder="Seu nome e sobrenome"
                    value={formData.nomeCompleto}
                    onChange={(e) =>
                      updateField("nomeCompleto", e.target.value)
                    }
                    className={`text-base py-2 h-11 px-4 rounded-lg focus:ring-green-500 ${
                      errors.nomeCompleto ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.nomeCompleto && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.nomeCompleto}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="instagram"
                    className="flex items-center text-sm font-medium text-gray-700 mb-1"
                  >
                    <Instagram className="h-4 w-4 mr-2 text-gray-500" />
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    type="text"
                    placeholder="@seuusuario"
                    value={formData.instagram}
                    onChange={(e) => updateField("instagram", e.target.value)}
                    className={`text-base py-2 h-11 px-4 rounded-lg focus:ring-green-500 ${
                      errors.instagram ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.instagram && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.instagram}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="whatsapp"
                    className="flex items-center text-sm font-medium text-gray-700 mb-1"
                  >
                    <MessageCircle className="h-4 w-4 mr-2 text-gray-500" />
                    WhatsApp
                  </Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    inputMode="numeric"
                    placeholder="Apenas números com DDD"
                    value={formData.whatsapp}
                    onChange={(e) =>
                      updateField("whatsapp", formatWhatsApp(e.target.value))
                    }
                    className={`text-base py-2 h-11 px-4 rounded-lg focus:ring-green-500 ${
                      errors.whatsapp ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.whatsapp && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.whatsapp}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full py-3 text-lg bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 rounded-xl shadow-lg h-12"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Finalizar Cadastro"
                )}
              </Button>
            </motion.div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
