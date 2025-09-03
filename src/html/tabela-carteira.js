import { corPorValor } from "../helpers/cor-por-valor.js";
import { formatarMoeda } from "../helpers/formatar-valor.js";

export async function tabelaCarteiraHtml(dados) {
    const tabelaCarteira = `
        <div style="overflow-x:auto; margin:20px 0;">
          <table style="width:100%; border-collapse:collapse; font-family:'Georgia', serif; font-size:13px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <thead>
              <tr style="background: linear-gradient(135deg, #1a252f 0%, #2c3e50 100%); color:#fff;">
                <th style="padding:12px 8px; border:1px solid #34495e; text-align:left; font-weight:600; font-size:12px; text-transform:uppercase; letter-spacing:0.5px;">Ativo</th>
                <th style="padding:12px 8px; border:1px solid #34495e; text-align:center; font-weight:600; font-size:12px; text-transform:uppercase; letter-spacing:0.5px;">Tipo</th>
                <th style="padding:12px 8px; border:1px solid #34495e; text-align:right; font-weight:600; font-size:12px; text-transform:uppercase; letter-spacing:0.5px;">Cotação</th>
                <th style="padding:12px 8px; border:1px solid #34495e; text-align:center; font-weight:600; font-size:12px; text-transform:uppercase; letter-spacing:0.5px;">Atual</th>
                <th style="padding:12px 8px; border:1px solid #34495e; text-align:center; font-weight:600; font-size:12px; text-transform:uppercase; letter-spacing:0.5px;">Meta</th>
                <th style="padding:12px 8px; border:1px solid #34495e; text-align:center; font-weight:600; font-size:12px; text-transform:uppercase; letter-spacing:0.5px;">Comprar</th>
                <th style="padding:12px 8px; border:1px solid #34495e; text-align:right; font-weight:600; font-size:12px; text-transform:uppercase; letter-spacing:0.5px;">Valor Atual</th>
                <th style="padding:12px 8px; border:1px solid #34495e; text-align:right; font-weight:600; font-size:12px; text-transform:uppercase; letter-spacing:0.5px;">Custo Meta</th>
                <th style="padding:12px 8px; border:1px solid #34495e; text-align:center; font-weight:600; font-size:12px; text-transform:uppercase; letter-spacing:0.5px;">DY</th>
                <th style="padding:12px 8px; border:1px solid #34495e; text-align:center; font-weight:600; font-size:12px; text-transform:uppercase; letter-spacing:0.5px;">P/VP</th>
                <th style="padding:12px 8px; border:1px solid #34495e; text-align:center; font-weight:600; font-size:12px; text-transform:uppercase; letter-spacing:0.5px;">ROE</th>
              </tr>
            </thead>
            <tbody>
              ${dados.carteira.map((item, index) => `
                <tr style="background:${index % 2 === 0 ? '#ffffff' : '#f8f9fa'}; transition: background-color 0.2s;">
                  <td style="padding:10px 8px; border:1px solid #e9ecef; font-weight:600; color:#2c3e50;">${item.nome}</td>
                  <td style="padding:10px 8px; border:1px solid #e9ecef; text-align:center;">
                    <span style="padding:4px 8px; border-radius:12px; font-size:10px; font-weight:600; color:#fff; background:${item.tipo === 'Ação' ? '#3498db' : '#e74c3c'};">
                      ${item.tipo}
                    </span>
                  </td>
                  <td style="padding:10px 8px; border:1px solid #e9ecef; text-align:right; font-weight:500;">${formatarMoeda(item.preco)}</td>
                  <td style="padding:10px 8px; border:1px solid #e9ecef; text-align:center; font-weight:600; color:#2c3e50;">${item.qtdAtual}</td>
                  <td style="padding:10px 8px; border:1px solid #e9ecef; text-align:center; color:#7f8c8d;">${item.qtdMeta}</td>
                  <td style="padding:10px 8px; border:1px solid #e9ecef; text-align:center; font-weight:600; color:${item.qtdComprar > 0 ? '#e74c3c' : '#27ae60'};">
                    ${item.qtdComprar > 0 ? '+' + item.qtdComprar : '✓'}
                  </td>
                  <td style="padding:10px 8px; border:1px solid #e9ecef; text-align:right; font-weight:600; color:#2c3e50;">${formatarMoeda(item.valorAtual)}</td>
                  <td style="padding:10px 8px; border:1px solid #e9ecef; text-align:right; color:#7f8c8d;">${formatarMoeda(item.custoTotal)}</td>
                  <td style="padding:10px 8px; border:1px solid #e9ecef; text-align:center; font-weight:600; color:${item.dy !== 'N/A' ? corPorValor(item.dy * 100, 'dy') : '#95a5a6'};">
                    ${item.dy !== "N/A" ? (item.dy * 100).toFixed(1) + '%' : "N/A"}
                  </td>
                  <td style="padding:10px 8px; border:1px solid #e9ecef; text-align:center; font-weight:600; color:${item.pvp !== 'N/A' ? corPorValor(item.pvp, 'pvp') : '#95a5a6'};">
                    ${item.pvp !== "N/A" ? item.pvp.toFixed(2) : "N/A"}
                  </td>
                  <td style="padding:10px 8px; border:1px solid #e9ecef; text-align:center; font-weight:600; color:${item.roe !== 'N/A' ? corPorValor(item.roe * 100, 'roe') : '#95a5a6'};">
                    ${item.roe !== "N/A" ? (item.roe * 100).toFixed(1) + '%' : "N/A"}
                  </td>
                </tr>`).join("")}
            </tbody>
          </table>
        </div>
      `;

    return tabelaCarteira;
}