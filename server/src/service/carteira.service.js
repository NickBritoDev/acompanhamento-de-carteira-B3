import yahooFinance from 'yahoo-finance2'

export async function obterDadosAtivo(simbolo) {
  try {
    const quote = await yahooFinance.quote(simbolo)

    let fundamentals = null
    try {
      fundamentals = await yahooFinance.quoteSummary(simbolo, {
        modules: ['defaultKeyStatistics', 'summaryDetail', 'financialData'],
      })
    } catch {
      console.warn(`⚠️  Dados fundamentais não disponíveis para ${simbolo}`)
    }

    return {
      preco: quote.regularMarketPrice || quote.price || 0,
      pvp:
        fundamentals?.defaultKeyStatistics?.priceToBook ||
        fundamentals?.summaryDetail?.priceToBook ||
        'N/A',
      roe:
        fundamentals?.financialData?.returnOnEquity ||
        fundamentals?.financialData?.returnOnEquityRatio ||
        'N/A',
      dy:
        fundamentals?.summaryDetail?.dividendYield ||
        fundamentals?.summaryDetail?.trailingAnnualDividendYield ||
        'N/A',
      variacao: quote.regularMarketChangePercent || 0,
    }
  } catch (error) {
    console.error(`❌ Erro ao buscar dados para ${simbolo}:`, (error).message)
    return {
      preco: 0,
      pvp: 'N/A',
      roe: 'N/A',
      dy: 'N/A',
      variacao: 0,
    }
  }
}