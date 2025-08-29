import Table from "cli-table3";
import yahooFinance from "yahoo-finance2";
import { carteira } from "./carteira.js";

async function obterDadosAtivo(simbolo) {
    try {
        const quote = await yahooFinance.quote(simbolo);

        let fundamentals = null;
        try {
            fundamentals = await yahooFinance.quoteSummary(simbolo, {
                modules: ["defaultKeyStatistics", "summaryDetail", "financialData"],
            });
        } catch {
            console.warn(`⚠️  Dados fundamentais não disponíveis para ${simbolo}`);
        }

        return {
            preco: quote.regularMarketPrice || quote.price || 0,
            pvp:
                fundamentals?.defaultKeyStatistics?.priceToBook ||
                fundamentals?.summaryDetail?.priceToBook ||
                "N/A",
            roe:
                fundamentals?.financialData?.returnOnEquity ||
                fundamentals?.financialData?.returnOnEquityRatio ||
                "N/A",
            dy:
                fundamentals?.summaryDetail?.dividendYield ||
                fundamentals?.summaryDetail?.trailingAnnualDividendYield ||
                "N/A",
            variacao: quote.regularMarketChangePercent || 0,
        };
    } catch (error) {
        console.error(`❌ Erro ao buscar dados para ${simbolo}:`, error.message);
        return {
            preco: 0,
            pvp: "N/A",
            roe: "N/A",
            dy: "N/A",
            variacao: 0,
        };
    }
}

async function atualizarCarteira() {
    console.log("🔄 Buscando dados atualizados do Yahoo Finance...\n");

    const totalCols = 12;
    const terminalWidth = 180;
    const colWidth = Math.floor(terminalWidth / totalCols);

    const table = new Table({
        head: [
            "Ativo",
            "Tipo",
            "Preço (R$)",
            "Qtd Atual",
            "Valor Atual",
            "Qtd Meta",
            "Qtd Comprar",
            "Custo Total",
            "Var %",
            "P/VP",
            "ROE",
            "DY",
        ],
        colWidths: Array(totalCols).fill(colWidth),
        wordWrap: true,
    });

    let subtotalAcoes = 0;
    let subtotalFiis = 0;
    let qtdTotalAtivos = 0;
    let valorTotalCarteira = 0;
    let custoTotalMeta = 0;

    for (const item of carteira) {
        const dados = await obterDadosAtivo(item.ativo);

        const valorAtual = item.qtdAtual * dados.preco;
        const qtdComprar = item.qtdMeta - item.qtdAtual;
        const custoTotal = item.qtdMeta * dados.preco;

        const precoFormatado =
            dados.preco > 0 ? `R$ ${dados.preco.toFixed(2)}` : "N/D";
        const variacaoFormatada =
            dados.variacao !== 0 ? `${dados.variacao.toFixed(2)}%` : "0%";
        const valorAtualFormatado =
            valorAtual > 0 ? `R$ ${valorAtual.toFixed(2)}` : "R$ 0,00";
        const custoTotalFormatado =
            custoTotal > 0 ? `R$ ${custoTotal.toFixed(2)}` : "R$ 0,00";

        const pvpFormatado =
            typeof dados.pvp === "number" ? dados.pvp.toFixed(2) : "N/A";
        const roeFormatado =
            typeof dados.roe === "number" ? `${(dados.roe * 100).toFixed(1)}%` : "N/A";
        const dyFormatado =
            typeof dados.dy === "number" ? `${(dados.dy * 100).toFixed(1)}%` : "N/A";

        table.push([
            item.nome,
            item.tipo,
            precoFormatado,
            item.qtdAtual,
            valorAtualFormatado,
            item.qtdMeta,
            qtdComprar,
            custoTotalFormatado,
            variacaoFormatada,
            pvpFormatado,
            roeFormatado,
            dyFormatado,
        ]);

        qtdTotalAtivos += item.qtdAtual;
        valorTotalCarteira += valorAtual;
        custoTotalMeta += custoTotal;

        if (item.tipo === "Ação") subtotalAcoes += valorAtual;
        if (item.tipo === "FII") subtotalFiis += valorAtual;

        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // === TABELA PRINCIPAL DA CARTEIRA ===
    console.log("\n" + "=".repeat(terminalWidth));
    console.log("📊 CARTEIRA DE INVESTIMENTOS - DADOS EM TEMPO REAL");
    console.log("=".repeat(terminalWidth));
    console.log(table.toString());

    // === TABELA RESUMO FINANCEIRO E DISTRIBUIÇÃO ===
    const percAcoes = ((subtotalAcoes / valorTotalCarteira) * 100).toFixed(1);
    const percFiis = ((subtotalFiis / valorTotalCarteira) * 100).toFixed(1);

    const resumoTable = new Table({
        head: ["Resumo", "Valor"],
        colWidths: [40, 40],
        wordWrap: true,
    });

    resumoTable.push(
        ["Subtotal Ações", `R$ ${subtotalAcoes.toFixed(2)} / ${percAcoes}%`],
        ["Subtotal FIIs", `R$ ${subtotalFiis.toFixed(2)} / ${percFiis}%`],
        ["Quantidade de Ativos", qtdTotalAtivos],
        ["Valor Total Atual", `R$ ${valorTotalCarteira.toFixed(2)}`],
        ["Necessário Investir", `R$ ${(custoTotalMeta - valorTotalCarteira).toFixed(2)}`],
        ["Custo Meta Total", `R$ ${custoTotalMeta.toFixed(2)}`]
    );

    console.log("=".repeat(terminalWidth));
    console.log("💰 RESUMO FINANCEIRO");
    console.log("=".repeat(terminalWidth));
    console.log(resumoTable.toString());

    console.log("\n⏰ Última atualização:", new Date().toLocaleString("pt-BR"));
}

async function main() {
    try {
        await atualizarCarteira();
    } catch (error) {
        console.error("❌ Erro na execução:", error);
    }
}

main();
