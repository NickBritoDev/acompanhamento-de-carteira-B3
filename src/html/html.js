import { marked } from "marked";
import { chamarGemini } from "../functions/gemini.js";
import { dataAtual } from "../helpers/data-atual.js";
import { promptGemini } from "../utils/prompt.js";
import { cardsMetricasHtml } from "./cards-metrica.js";
import { resumoDetalhadoHtml } from "./resumo-detalhado.js";
import { tabelaCarteiraHtml } from "./tabela-carteira.js";

export async function html(dados) {
    const tabelaCarteira = await tabelaCarteiraHtml(dados);
    const cardsMetricas = await cardsMetricasHtml(dados);
    const resumoDetalhado = await resumoDetalhadoHtml(dados);
    const prompt = await promptGemini(dados);

    const analiseMarkdown = await chamarGemini(prompt);
    const analise = marked(analiseMarkdown); // converte para HTML

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>The Financial Herald - Relatório de Investimentos</title>
        <!--[if mso]>
        <style type="text/css">
        table { border-collapse: collapse; }
        </style>
        <![endif]-->
        </head>
        <body style="margin:0; padding:0; background-color:#f4f1e8; font-family:Georgia, 'Times New Roman', serif;">

        <!-- Container principal para email -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f1e8;">
        <tr>
        <td align="center" style="padding:20px 10px;">

        <!-- Container do jornal -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#fefcf7; border:3px solid #8b7355; box-shadow:0 0 20px rgba(0,0,0,0.1);">

        <!-- Cabeçalho do jornal vintage -->
        <tr>
        <td style="background-color:#2c2c2c; background-image:linear-gradient(180deg, #1a1a1a 0%, #2c2c2c 100%); color:#f4f1e8; text-align:center; padding:30px 20px; border-bottom:4px double #d4af37; position:relative;">
        <div style="font-size:11px; text-align:right; opacity:0.7; margin-bottom:10px;">Vol. ${new Date().getFullYear()} • Nº ${new Date().getDate()}${new Date().getMonth() + 1}</div>
        <h1 style="margin:0; font-size:42px; font-weight:bold; letter-spacing:2px; text-shadow:2px 2px 4px rgba(0,0,0,0.3); font-family:Georgia, 'Times New Roman', serif;">
        THE FINANCIAL HERALD
        </h1>
        <div style="font-size:13px; margin:8px 0; text-transform:uppercase; letter-spacing:2px; opacity:0.9;">
        Relatório Personalizado de Investimentos
        </div>
        <div style="height:2px; background-color:#d4af37; margin:15px auto; width:200px;"></div>
        <div style="font-size:16px; font-weight:bold; color:#d4af37;">
        📅 Edição de ${dataAtual}
        </div>
        </td>
        </tr>

        <!-- Linha decorativa -->
        <tr>
        <td style="background-color:#fefcf7; height:10px; background-image:repeating-linear-gradient(90deg, #d4af37 0px, #d4af37 2px, transparent 2px, transparent 8px);"></td>
        </tr>

        <!-- Cards de métricas (seu componente existente) -->
        <tr>
        <td style="padding:20px;">
        <div style="background-color:#fff; border:2px solid #8b7355; padding:15px; margin:10px 0;">
        ${cardsMetricas}
        </div>
        </td>
        </tr>

        <!-- Manchete principal -->
        <tr>
        <td style="text-align:center; padding:25px 20px; background-color:#f9f9f9; border-top:2px solid #8b7355; border-bottom:2px solid #8b7355;">
        <h2 style="margin:0 0 8px 0; font-size:24px; font-weight:bold; color:#2c2c2c; text-transform:uppercase; letter-spacing:1px; font-family:Georgia, serif;">
        📈 POSIÇÕES EM CARTEIRA
        </h2>
        <p style="margin:0; color:#666; font-size:13px; font-style:italic;">
        Análise detalhada dos seus investimentos • Atualizado em tempo real
        </p>
        </td>
        </tr>

        <!-- Tabela principal (seu componente existente) -->
        <tr>
        <td style="padding:20px;">
        <div style="background-color:#fff; border:2px solid #8b7355;">
        ${tabelaCarteira}
        </div>
        </td>
        </tr>

        <!-- Resumo detalhado (seu componente existente) -->
        <tr>
        <td style="padding:20px;">
        <div style="background-color:#fff; border:2px solid #8b7355; padding:15px;">
        ${resumoDetalhado}
        </div>
        </td>
        </tr>

        <!-- Gráfico de distribuição -->
        <tr>
        <td style="text-align:center; padding:30px 20px; background-color:#fff; border:2px solid #8b7355; margin:20px;">
        <h3 style="margin:0 0 20px 0; font-size:20px; font-weight:bold; color:#2c2c2c; font-family:Georgia, serif;">
        🎯 DISTRIBUIÇÃO DE ATIVOS
        </h3>
        <img src="https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify({
        type: "doughnut",
        data: {
            labels: [`Ações (${dados.resumo.percAcoes}%)`, `FIIs (${dados.resumo.percFiis}%)`],
            datasets: [{
                data: [dados.resumo.percAcoes, dados.resumo.percFiis],
                backgroundColor: ["#8b7355", "#d4af37"],
                borderWidth: 3,
                borderColor: "#fff"
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        font: { size: 14, weight: "600" },
                        padding: 20,
                        color: "#2c2c2c"
                    }
                }
            },
            elements: {
                arc: {
                    borderWidth: 3
                }
            }
        }
    }))}" alt="Distribuição dos Ativos" width="300" style="max-width:100%; border-radius:8px;" />
        </td>
        </tr>

        <!-- Editorial / Análise da IA -->
        <tr>
        <td style="background-color:#8b7355; color:#fff; padding:20px; text-align:center;">
        <h2 style="margin:0; font-size:22px; font-weight:bold; font-family:Georgia, serif;">
        🤖 ANÁLISE ESPECIALIZADA
        </h2>
        <p style="margin:8px 0 0 0; opacity:0.9; font-size:13px;">
        Por nossa Inteligência Artificial Financeira
        </p>
        </td>
        </tr>
        <tr>
        <td style="padding:25px; background-color:#fff; font-size:14px; line-height:1.6; color:#2c2c2c; border-left:4px solid #d4af37;">
        ${analise}
        </td>
        </tr>

        <!-- Rodapé -->
        <tr>
        <td style="background-color:#2c2c2c; color:#bdc3c7; padding:25px 20px; text-align:center; border-top:4px double #d4af37;">
        <div style="font-size:14px; margin-bottom:8px; font-weight:bold;">
        THE FINANCIAL HERALD
        </div>
        <div style="font-size:11px; opacity:0.8; line-height:1.4;">
        Relatório Personalizado de Investimentos<br>
        Relatório gerado automaticamente • ${dados.resumo.ultimaAtualizacao}
        </div>
        <div style="font-size:10px; margin-top:15px; opacity:0.6; border-top:1px solid #34495e; padding-top:15px; line-height:1.3;">
        Este relatório é fornecido apenas para fins informativos.<br>
        Não constitui aconselhamento de investimento.
        </div>
        </td>
        </tr>

        </table>
        </td>
        </tr>
        </table>

        </body>
        </html>
    `;

    return html;
}