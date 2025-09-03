import { formatarMoeda } from "../helpers/formatar-valor.js";

export async function resumoDetalhadoHtml(dados) {
    const resumoDetalhado = `
        <div style="background:#fff; border:1px solid #e9ecef; border-radius:8px; overflow:hidden; margin:25px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <div style="background:linear-gradient(135deg, #2c3e50 0%, #34495e 100%); color:#fff; padding:15px;">
            <h3 style="margin:0; font-size:18px; font-weight:600;">📊 Composição da Carteira</h3>
          </div>
          <div style="padding:20px;">
            <div style="display:flex; flex-wrap:wrap; gap:20px;">
              <div style="flex:1; min-width:250px;">
                <div style="border-left:4px solid #3498db; padding-left:15px; margin-bottom:15px;">
                  <h4 style="margin:0 0 8px 0; color:#2c3e50; font-size:16px;">💼 Ações</h4>
                  <div style="font-size:24px; font-weight:700; color:#3498db; margin-bottom:5px;">${formatarMoeda(dados.resumo.subtotalAcoes)}</div>
                  <div style="color:#7f8c8d; font-size:14px;">${dados.resumo.percAcoes}% da carteira</div>
                </div>
              </div>
              <div style="flex:1; min-width:250px;">
                <div style="border-left:4px solid #e74c3c; padding-left:15px; margin-bottom:15px;">
                  <h4 style="margin:0 0 8px 0; color:#2c3e50; font-size:16px;">🏢 FIIs</h4>
                  <div style="font-size:24px; font-weight:700; color:#e74c3c; margin-bottom:5px;">${formatarMoeda(dados.resumo.subtotalFiis)}</div>
                  <div style="color:#7f8c8d; font-size:14px;">${dados.resumo.percFiis}% da carteira</div>
                </div>
              </div>
            </div>
            <div style="border-top:1px solid #e9ecef; padding-top:15px; margin-top:15px;">
              <div style="text-align:center; color:#7f8c8d; font-size:13px;">
                <strong>Custo Total para Atingir Metas:</strong> ${formatarMoeda(dados.resumo.custoTotalMeta)}
              </div>
            </div>
          </div>
        </div>
      `;

    return resumoDetalhado;
}