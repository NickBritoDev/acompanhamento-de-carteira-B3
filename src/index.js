import cron from "node-cron";
import { enviarEmail } from "./email/enviar-email.js";
import { atualizarCarteira } from "./functions/atualizar-carteira.js";

cron.schedule("0 10,16 * * *", async () => {
    console.log("Iniciando atualização e envio de email:", new Date().toLocaleString());
    try {
        const dados = await atualizarCarteira();
        await enviarEmail(dados);
        console.log("Email enviado com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar carteira ou enviar email:", error);
    }
});


(async () => {
    const dados = await atualizarCarteira();
    await enviarEmail(dados);
})();