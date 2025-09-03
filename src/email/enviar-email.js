import nodemailer from "nodemailer";
import { dataAtual } from "../helpers/data-atual.js";
import { html } from "../html/html.js";
import "dotenv/config";

export async function enviarEmail(dados) {
    const indexHtml = await html(dados)
    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "sendnotificationtc@gmail.com",
      pass: "qrgf vmve omdg lfvq",
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"Financial Times - Relatórios" <sendnotificationtc@gmail.com>',
      to: process.env.EMAIL_USER,
      subject: `📊 Financial Times - Relatório de Investimentos • ${dataAtual}`,
      html: indexHtml,
    });

    console.log("✅ Email enviado com sucesso:", info.messageId);
  } catch (err) {
    console.error("❌ Erro ao enviar email:", err);
  }
}