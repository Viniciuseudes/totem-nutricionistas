"use server";

import { addRowToSheet } from "@/lib/google-sheets";

// Server Action para salvar os dados na planilha
export async function saveToGoogleSheets(data: {
  nomeCompleto: string;
  instagram: string;
  whatsapp: string;
}) {
  try {
    const result = await addRowToSheet(data);
    return result;
  } catch (error) {
    console.error("Erro ao salvar dados:", error);
    return { success: false, error: "Falha ao salvar dados" };
  }
}