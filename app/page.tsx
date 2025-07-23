"use client";

import { useState, useEffect } from "react";
import { WelcomeScreen } from "@/components/welcome-screen";
import { QuestionnaireForm } from "@/components/questionnaire-form";
import { ThankYouScreen } from "@/components/thank-you-screen";
import { TotemFrame } from "@/components/totem-frame";
import { saveToGoogleSheets } from "./actions"; // A action será modificada

export default function Home() {
  const [step, setStep] = useState<"welcome" | "form" | "thank-you">("welcome");
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    instagram: "",
    whatsapp: "",
  });
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");

  // O useEffect de inatividade pode ser mantido como está
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        handleReset();
      }, 3 * 60 * 1000); // 3 minutos
    };
    resetTimer();
    const events = ["mousedown", "touchstart", "keydown"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    return () => {
      clearTimeout(inactivityTimer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  const handleStart = () => {
    setStep("form");
  };

  const handleSubmit = async (data: typeof formData) => {
    setFormData(data);
    setSaveStatus("saving");
    setStep("thank-you"); // Mude para a tela de agradecimento imediatamente

    try {
      const result = await saveToGoogleSheets(data);
      if (result.success) {
        setSaveStatus("success");
      } else {
        console.error("Erro ao salvar:", result.error);
        setSaveStatus("error");
      }
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      setSaveStatus("error");
    }
  };

  const handleReset = () => {
    setFormData({
      nomeCompleto: "",
      instagram: "",
      whatsapp: "",
    });
    setSaveStatus("idle");
    setStep("welcome");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-0 bg-gradient-to-b from-green-600 to-teal-900 overflow-hidden">
      <TotemFrame className="h-[95vh]">
        {step === "welcome" && <WelcomeScreen onStart={handleStart} />}
        {step === "form" && (
          <QuestionnaireForm onSubmit={handleSubmit} initialData={formData} />
        )}
        {step === "thank-you" && (
          <ThankYouScreen onReset={handleReset} saveStatus={saveStatus} />
        )}
      </TotemFrame>
    </main>
  );
}
