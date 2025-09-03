import { enviarEmail } from "./email/enviar-email.js";
import { atualizarCarteira } from "./functions/atualizar-carteira.js";

(async () => {
    const dados = await atualizarCarteira();
    await enviarEmail(dados);
})();