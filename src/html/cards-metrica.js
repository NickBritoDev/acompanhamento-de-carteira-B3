import { formatarMoeda } from "../helpers/formatar-valor.js";

export async function cardsMetricasHtml(dados) {
    const cardsMetricas = `
        <div style="display:flex; gap: 10px; margin:25px 0; width:100%; align-items: center; justify-content: space-between;">
          <div style="flex:1; margin-inline: 4px; width:100%; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); color:#fff; padding:20px; border-radius:12px; text-align:center; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            <div style="font-size:28px; font-weight:700; margin-bottom:5px;">${formatarMoeda(dados.resumo.valorTotalCarteira)}</div>
            <div style="font-size:12px; text-transform:uppercase; letter-spacing:1px; opacity:0.9;">Valor Total da Carteira</div>
          </div>
          <div style="flex:1; width:100%; margin-inline: 4px; background:linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color:#fff; padding:20px; border-radius:12px; text-align:center; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            <div style="font-size:28px; font-weight:700; margin-bottom:5px;">${formatarMoeda(dados.resumo.necessarioInvestir)}</div>
            <div style="font-size:12px; text-transform:uppercase; letter-spacing:1px; opacity:0.9;">Necessário Investir</div>
          </div>
          <div style="flex:1; width:100%;margin-inline: 4px; background:linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color:#fff; padding:20px; border-radius:12px; text-align:center; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            <div style="font-size:28px; font-weight:700; margin-bottom:5px;">${dados.resumo.qtdTotalAtivos}</div>
            <div style="font-size:12px; text-transform:uppercase; letter-spacing:1px; opacity:0.9;">Total de Ativos</div>
          </div>
        </div>
      `;

    return cardsMetricas
}