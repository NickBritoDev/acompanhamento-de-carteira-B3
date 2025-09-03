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
    const analise = await chamarGemini(prompt);

    const analiseFormatada = analise
        .replace(/\*\*(.*?)\*\*/g, '<h3 style="margin:25px 0 15px 0; color:#2c3e50; font-size:20px; font-weight:600; border-bottom:2px solid #3498db; padding-bottom:8px; display:flex; align-items:center;"><span style="background:#3498db; color:#fff; border-radius:6px; padding:6px 12px; margin-right:12px; font-size:14px;">📈</span>$1</h3>')
        .replace(/\n\* /g, '<li style="margin:8px 0; line-height:1.6; color:#2c3e50;">')
        .replace(/\n/g, '<br>')
        .replace(/<li>(.*?)<br>/g, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/gs, '<ul style="margin:15px 0; padding-left:20px;">$1</ul>');

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Relatório de Investimentos</title>
        </head>
        <body style="margin:0; padding:0; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background:#f8f9fa;">
        <div style="max-width:1000px; margin:0 auto; background:#fff;">

        <!-- Cabeçalho estilo jornal premium -->
        <header style="background:linear-gradient(135deg, #1a252f 0%, #2c3e50 100%); color:#fff; text-align:center; padding:30px 20px; position:relative;">
        <div style="border-bottom:3px solid #f39c12; padding-bottom:20px; margin-bottom:20px;">
        <h1 style="margin:0; font-size:36px; font-weight:700; letter-spacing:-1px; text-shadow:2px 2px 4px rgba(0,0,0,0.3);">
        💰 FINANCIAL TIMES
        </h1>
        <div style="font-size:14px; font-weight:300; margin-top:8px; opacity:0.9; text-transform:uppercase; letter-spacing:2px;">
        Relatório Personalizado de Investimentos
        </div>
        </div>
        <div style="font-size:16px; font-weight:500;">
        📅 Edição de ${dataAtual}
        </div>
        <div style="position:absolute; top:15px; right:20px; font-size:12px; opacity:0.7;">
        Vol. ${new Date().getFullYear()} • Nº ${new Date().getDate()}${new Date().getMonth() + 1}
        </div>
        </header>

        <!-- Conteúdo principal -->
        <main style="padding:0 20px;">

        <!-- Cards de métricas -->
        ${cardsMetricas}

        <!-- Linha editorial -->
        <div style="text-align:center; margin:30px 0; padding:20px; background:linear-gradient(135deg, #667eea22 0%, #764ba222 100%); border-radius:8px; border:1px solid #e9ecef;">
        <h2 style="margin:0 0 10px 0; color:#2c3e50; font-size:22px; font-weight:600;">
        📈 Posições em Carteira
        </h2>
        <p style="margin:0; color:#7f8c8d; font-size:14px; font-style:italic;">
        Análise detalhada dos seus investimentos • Atualizado em tempo real
        </p>
        </div>

        <!-- Tabela principal -->
        ${tabelaCarteira}

        <!-- Resumo detalhado -->
        ${resumoDetalhado}

        <!-- Gráfico de distribuição -->
        <div style="margin:30px 0; text-align:center; background:#fff; border:1px solid #e9ecef; border-radius:8px; padding:25px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        <h3 style="margin:0 0 20px 0; color:#2c3e50; font-size:20px; font-weight:600;">
        🎯 Distribuição de Ativos
        </h3>
        <img src="https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify({
        type: "doughnut",
        data: {
            labels: [`Ações (${dados.resumo.percAcoes}%)`, `FIIs (${dados.resumo.percFiis}%)`],
            datasets: [{
                data: [dados.resumo.percAcoes, dados.resumo.percFiis],
                backgroundColor: ["#3498db", "#e74c3c"],
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
                        color: "#2c3e50"
                    }
                }
            },
            elements: {
                arc: {
                    borderWidth: 3
                }
            }
        }
    }))}" alt="Distribuição dos Ativos" style="max-width:350px; width:100%; border-radius:8px;" />
        </div>

        <!-- Análise da IA estilo editorial -->
        <article style="margin:30px 0; background:#fff; border:1px solid #e9ecef; border-radius:8px; overflow:hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        <header style="background:linear-gradient(135deg, #f39c12 0%, #e67e22 100%); color:#fff; padding:20px;">
        <h2 style="margin:0; font-size:24px; font-weight:600; display:flex; align-items:center;">
        <span style="margin-right:12px;">🤖</span>
        Análise Especializada
        </h2>
        <p style="margin:8px 0 0 0; opacity:0.9; font-size:14px;">
        Por nossa Inteligência Artificial Financeira
        </p>
        </header>
        <div style="padding:25px; font-size:15px; line-height:1.7; color:#2c3e50;">
        ${analiseFormatada}
        </div>
        </article>

        </main>

        <!-- Rodapé -->
        <footer style="background:#2c3e50; color:#bdc3c7; padding:25px 20px; text-align:center; border-top:4px solid #f39c12;">
        <div style="font-size:14px; margin-bottom:10px;">
        <strong>Financial Times</strong> • Relatório Personalizado de Investimentos
        </div>
        <div style="font-size:12px; opacity:0.8;">
        Relatório gerado automaticamente • ${dados.resumo.ultimaAtualizacao}
        </div>
        <div style="font-size:11px; margin-top:15px; opacity:0.6; border-top:1px solid #34495e; padding-top:15px;">
        Este relatório é fornecido apenas para fins informativos. Não constitui aconselhamento de investimento.
        </div>
        </footer>

        </div>
        </body>
        </html>
        `;

    return html;
}