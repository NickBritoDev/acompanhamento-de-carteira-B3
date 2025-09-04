import { formatarMoeda } from "../helpers/formatar-valor.js";

export async function cardsMetricasHtml(dados) {
  const cardsMetricas = `
    <div style="display:flex; gap:0; margin:25px 0; width:100%; 
                align-items: center; justify-content: center;
                background:linear-gradient(135deg, #c49a6c 0%, #8b5e3c 100%);
                border-radius:12px; overflow:hidden; 
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
      
      <!-- Card 1 -->
      <div style="width:100%; padding:20px; text-align:center; color:#fff; border-right:1px solid rgba(255,255,255,0.2);">
        <div style="font-size:28px; font-weight:700; margin-bottom:5px;">
          ${formatarMoeda(dados.resumo.valorTotalCarteira)}
        </div>
        <div style="font-size:12px; text-transform:uppercase; letter-spacing:1px; opacity:0.9;">
          Valor Total da Carteira
        </div>
      </div>

      <!-- Card 2 -->
      <div style="width:100%; padding:20px; text-align:center; color:#fff; border-right:1px solid rgba(255,255,255,0.2);">
        <div style="font-size:28px; font-weight:700; margin-bottom:5px;">
          ${formatarMoeda(dados.resumo.necessarioInvestir)}
        </div>
        <div style="font-size:12px; text-transform:uppercase; letter-spacing:1px; opacity:0.9;">
          Necessário Investir
        </div>
      </div>

      <!-- Card 3 -->
      <div style="width:100%; padding:20px; text-align:center; color:#fff;">
        <div style="font-size:28px; font-weight:700; margin-bottom:5px;">
          ${dados.resumo.qtdTotalAtivos}
        </div>
        <div style="font-size:12px; text-transform:uppercase; letter-spacing:1px; opacity:0.9;">
          Total de Ativos
        </div>
      </div>
    </div>
  `;

  return cardsMetricas;
}
