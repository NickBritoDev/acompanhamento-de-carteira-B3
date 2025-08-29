import { obterDadosAtivo } from "../service/carteira.service.js";
import { carteira } from "../utils/carteira.js";

export async function atualizarCarteira() {
  let subtotalAcoes = 0;
  let subtotalFiis = 0;
  let qtdTotalAtivos = 0;
  let valorTotalCarteira = 0;
  let custoTotalMeta = 0;

  const resultado = [];

  for (const item of carteira) {
    const dados = await obterDadosAtivo(item.ativo);

    const valorAtual = item.qtdAtual * dados.preco;
    const qtdComprar = item.qtdMeta - item.qtdAtual;
    const custoTotal = item.qtdMeta * dados.preco;

    resultado.push({
      nome: item.nome,
      tipo: item.tipo,
      preco: dados.preco,
      qtdAtual: item.qtdAtual,
      valorAtual,
      qtdMeta: item.qtdMeta,
      qtdComprar,
      custoTotal,
      variacao: dados.variacao,
      pvp: dados.pvp,
      roe: dados.roe,
      dy: dados.dy,
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
