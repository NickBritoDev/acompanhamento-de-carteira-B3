import cron from "node-cron";
import { enviarEmail } from "./email/enviar-email.js";
import { atualizarCarteira } from "./functions/atualizar-carteira.js";

cron.schedule(
  "0 10,16 * * *",
  async () => {
    const agora = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    console.log("Iniciando atualização e envio de email:", agora);
    try {
      const dados = await atualizarCarteira();
      await enviarEmail(dados);
      console.log("Email enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar carteira ou enviar email:", error);
    }
  },
  {
    timezone: "America/Sao_Paulo",
  }
);

(async () => {
  const dados = await atualizarCarteira();
  await enviarEmail(dados);
})();
