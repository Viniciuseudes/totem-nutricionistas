import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

// Função para inicializar a conexão com o Google Sheets (permanece a mesma)
export async function getGoogleSheet() {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID || "", serviceAccountAuth);
    await doc.loadInfo();
    return doc;
  } catch (error) {
    console.error("Erro ao conectar com o Google Sheets:", error);
    throw new Error("Falha ao conectar com o Google Sheets");
  }
}

// Função para adicionar uma nova linha à planilha (ATUALIZADA)
export async function addRowToSheet(data: {
  nomeCompleto: string;
  instagram: string;
  whatsapp: string;
}) {
  try {
    const doc = await getGoogleSheet();
    const sheet = doc.sheetsByIndex[0]; // Pega a primeira aba da planilha

    // Formata os dados para a nova linha
    const newRow = {
      "Nome Completo": data.nomeCompleto,
      "Instagram": data.instagram,
      "WhatsApp": data.whatsapp,
      "Data de Preenchimento": new Date().toLocaleString("pt-BR"),
    };

    // Adiciona a nova linha
    await sheet.addRow(newRow);

    return { success: true };
  } catch (error) {
    console.error("Erro ao adicionar dados à planilha:", error);
    return { success: false, error: "Falha ao salvar dados na planilha" };
  }
}