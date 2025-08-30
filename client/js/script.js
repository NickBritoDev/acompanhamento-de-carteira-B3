let dadosOriginais = [];
let dadosFiltrados = [];

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatPercentage(value) {
    if (value === 0) return '0,00%';
    return (value * 100).toFixed(2).replace('.', ',') + '%';
}

function getVariacaoClass(variacao) {
    if (variacao > 0) return 'variacao-positiva';
    if (variacao < 0) return 'variacao-negativa';
    return 'variacao-neutra';
}

function formatVariacao(variacao) {
    if (variacao === 0) return '0,00%';
    const percent = (variacao * 100).toFixed(2).replace('.', ',');
    const icon = variacao > 0 ? 'fa-arrow-up' : variacao < 0 ? 'fa-arrow-down' : 'fa-minus';
    return `<i class="fas ${icon}"></i> ${variacao > 0 ? '+' : ''}${percent}%`;
}

function getAtivoIcon(tipo) {
    return tipo === 'Ação' ? 'fas fa-chart-bar' : 'fas fa-building';
}

function loadDataFromAPI(data) {
    dadosOriginais = data.carteira;
    dadosFiltrados = [...dadosOriginais];

    // Preenche o resumo
    document.getElementById('valorTotal').textContent = formatCurrency(data.resumo.valorTotalCarteira);
    document.getElementById('necessarioInvestir').textContent = formatCurrency(data.resumo.necessarioInvestir);
    document.getElementById('custoTotalMeta').textContent = formatCurrency(data.resumo.custoTotalMeta);
    document.getElementById('valorAcoes').textContent = formatCurrency(data.resumo.subtotalAcoes);
    document.getElementById('valorFiis').textContent = formatCurrency(data.resumo.subtotalFiis);
    document.getElementById('percAcoesLabel').textContent = data.resumo.percAcoes + '%';
    document.getElementById('percFiisLabel').textContent = data.resumo.percFiis + '%';
    document.getElementById('totalAtivos').textContent = data.resumo.qtdTotalAtivos;
    document.getElementById('ultimaAtualizacao').textContent = data.resumo.ultimaAtualizacao;
    document.getElementById('totalRegistros').textContent = `${data.carteira.length} ativos`;

    renderTable();
    setupFilters();

    // Esconde loading e mostra conteúdo
    document.getElementById('loading').style.display = 'none';
    document.getElementById('summary').style.display = 'grid';
    document.getElementById('filters').style.display = 'flex';
    document.getElementById('carteiraTable').style.display = 'table';
    document.getElementById('footer').style.display = 'flex';
}

function renderTable() {
    const tbody = document.getElementById('carteiraBody');
    tbody.innerHTML = '';

    if (dadosFiltrados.length === 0) {
        document.getElementById('carteiraTable').style.display = 'none';
        document.getElementById('emptyState').style.display = 'block';
        return;
    }

    document.getElementById('carteiraTable').style.display = 'table';
    document.getElementById('emptyState').style.display = 'none';

    dadosFiltrados.forEach((ativo, index) => {
        const row = document.createElement('tr');
        const progressPercent = (ativo.qtdAtual / ativo.qtdMeta) * 100;

        row.innerHTML = `
                    <td>
                        <div class="ativo-nome">
                            <div class="ativo-icon icon-${ativo.tipo.toLowerCase() === 'ação' ? 'stock' : 'fii'}">
                                <i class="${getAtivoIcon(ativo.tipo)}"></i>
                            </div>
                            <div>
                                <div><strong>${ativo.nome}</strong></div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${progressPercent}%"></div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td><span class="tipo-badge tipo-${ativo.tipo.toLowerCase()}">${ativo.tipo}</span></td>
                    <td class="currency">${formatCurrency(ativo.preco)}</td>
                    <td><strong>${ativo.qtdAtual}</strong></td>
                    <td class="currency">${formatCurrency(ativo.valorAtual)}</td>
                    <td><strong>${ativo.qtdMeta}</strong></td>
                    <td><span class="qtd-badge"><i class="fas fa-plus"></i> ${ativo.qtdComprar}</span></td>
                    <td class="currency">${formatCurrency(ativo.custoTotal)}</td>
                    <td class="variacao ${getVariacaoClass(ativo.variacao)}">${formatVariacao(ativo.variacao)}</td>
                    <td>${ativo.pvp === 'N/A' ? '<span style="color: #6b7280;">N/A</span>' : ativo.pvp.toFixed(2).replace('.', ',')}</td>
                    <td>${ativo.roe === 'N/A' ? '<span style="color: #6b7280;">N/A</span>' : formatPercentage(ativo.roe)}</td>
                    <td class="variacao variacao-positiva">${formatPercentage(ativo.dy)}</td>
                `;

        row.addEventListener('click', () => {
            row.classList.toggle('selected');
        });

        tbody.appendChild(row);
    });
}

function setupFilters() {
    const tipoFilter = document.getElementById('tipoFilter');
    const ordenarFilter = document.getElementById('ordenarFilter');
    const variacaoFilter = document.getElementById('variacaoFilter');
    const searchInput = document.getElementById('searchInput');

    function aplicarFiltros() {
        let dados = [...dadosOriginais];

        // Filtro por tipo
        if (tipoFilter.value) {
            dados = dados.filter(ativo => ativo.tipo === tipoFilter.value);
        }

        // Filtro por variação
        if (variacaoFilter.value) {
            dados = dados.filter(ativo => {
                if (variacaoFilter.value === 'positiva') return ativo.variacao > 0;
                if (variacaoFilter.value === 'negativa') return ativo.variacao < 0;
                if (variacaoFilter.value === 'neutra') return ativo.variacao === 0;
                return true;
            });
        }

        // Filtro por busca
        if (searchInput.value.trim()) {
            const search = searchInput.value.toLowerCase();
            dados = dados.filter(ativo =>
                ativo.nome.toLowerCase().includes(search)
            );
        }

        // Ordenação
        dados.sort((a, b) => {
            const campo = ordenarFilter.value;
            if (campo === 'nome') return a.nome.localeCompare(b.nome);
            return b[campo] - a[campo];
        });

        dadosFiltrados = dados;
        renderTable();
    }

    tipoFilter.addEventListener('change', aplicarFiltros);
    ordenarFilter.addEventListener('change', aplicarFiltros);
    variacaoFilter.addEventListener('change', aplicarFiltros);
    searchInput.addEventListener('input', aplicarFiltros);
}

async function fetchCarteira() {
    try {
        document.getElementById('loading').style.display = 'flex';
        const response = await fetch('http://localhost:5420/carteira');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        loadDataFromAPI(data);

    } catch (error) {
        console.error('Erro ao buscar dados da carteira:', error);
        document.getElementById('loading').innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 15px;"></i>
                        <h3>Erro ao conectar com a API</h3>
                        <p>Verifique se a API está rodando em http://localhost:5420/carteira</p>
                        <p style="font-size: 0.9rem; margin-top: 10px; opacity: 0.8;">Erro: ${error.message}</p>
                        <button class="retry-btn" onclick="fetchCarteira()">
                            <i class="fas fa-redo"></i> Tentar Novamente
                        </button>
                    </div>
                `;
    }
}

function atualizarDados() {
    document.getElementById('summary').style.display = 'none';
    document.getElementById('filters').style.display = 'none';
    document.getElementById('carteiraTable').style.display = 'none';
    document.getElementById('footer').style.display = 'none';
    document.getElementById('emptyState').style.display = 'none';
    fetchCarteira();
}

// Carrega os dados quando a página é aberta
document.addEventListener('DOMContentLoaded', fetchCarteira);

// Auto-refresh a cada 5 minutos
setInterval(fetchCarteira, 300000);
