import yahooFinance from "yahoo-finance2";
import { carteira } from "../data/carteira.js";

export async function atualizarCarteira() {
  let subtotalAcoes = 0;
  let subtotalFiis = 0;
  let qtdTotalAtivos = 0;
  let valorTotalCarteira = 0;
  let custoTotalMeta = 0;

  const resultado = [];

  for (const item of carteira) {
    let preco = 0;
    let variacao = 0;
    let pvp = "N/A";
    let roe = "N/A";
    let dy = "N/A";

    try {
      const quote = await yahooFinance.quote(item.ativo);

      let fundamentals = null;
      try {
        fundamentals = await yahooFinance.quoteSummary(item.ativo, {
          modules: ["defaultKeyStatistics", "summaryDetail", "financialData"],
        });
      } catch {
        console.warn(`⚠️ Dados fundamentais não disponíveis para ${item.ativo}`);
      }

      preco = quote.regularMarketPrice || quote.price || 0;
      variacao = quote.regularMarketChangePercent || 0;
      pvp =
        fundamentals?.defaultKeyStatistics?.priceToBook ||
        fundamentals?.summaryDetail?.priceToBook ||
        "N/A";
      roe =
        fundamentals?.financialData?.returnOnEquity ||
        fundamentals?.financialData?.returnOnEquityRatio ||
        "N/A";
      dy =
        fundamentals?.summaryDetail?.dividendYield ||
        fundamentals?.summaryDetail?.trailingAnnualDividendYield ||
        "N/A";
    } catch (error) {
      console.error(`❌ Erro ao buscar dados para ${item.ativo}:`, error.message);
    }

    const valorAtual = item.qtdAtual * preco;
    const qtdComprar = item.qtdMeta - item.qtdAtual;
    const custoTotal = item.qtdMeta * preco;

    resultado.push({
      nome: item.nome,
      tipo: item.tipo,
      preco,
      qtdAtual: item.qtdAtual,
      valorAtual,
      qtdMeta: item.qtdMeta,
      qtdComprar,
      custoTotal,
      variacao,
      pvp,
      roe,
      dy,
    });

    qtdTotalAtivos += item.qtdAtual;
    valorTotalCarteira += valorAtual;
    custoTotalMeta += custoTotal;

    if (item.tipo === "Ação") subtotalAcoes += valorAtual;
    if (item.tipo === "FII") subtotalFiis += valorAtual;

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return {
    carteira: resultado,
    resumo: {
      subtotalAcoes,
      subtotalFiis,
      qtdTotalAtivos,
      valorTotalCarteira,
      necessarioInvestir: custoTotalMeta - valorTotalCarteira,
      custoTotalMeta,
      percAcoes: ((subtotalAcoes / valorTotalCarteira) * 100).toFixed(1),
      percFiis: ((subtotalFiis / valorTotalCarteira) * 100).toFixed(1),
      ultimaAtualizacao: new Date().toLocaleString("pt-BR"),
    },
  };
}