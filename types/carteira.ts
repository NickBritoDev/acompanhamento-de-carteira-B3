export interface Ativo {
  id: string
  ativo: string
  nome: string
  tipo: 'Ação' | 'FII'
  qtdAtual: number
  qtdMeta: number
}

export interface DadosAtivo {
  preco: number
  pvp: number | string
  roe: number | string
  dy: number | string
  variacao: number
}

export interface AtivoCompleto extends Ativo {
  preco: number
  valorAtual: number
  qtdComprar: number
  custoTotal: number
  variacao: number
  pvp: number | string
  roe: number | string
  dy: number | string
}

export interface ResumoCarteira {
  subtotalAcoes: number
  subtotalFiis: number
  qtdTotalAtivos: number
  valorTotalCarteira: number
  necessarioInvestir: number
  custoTotalMeta: number
  percAcoes: string
  percFiis: string
  ultimaAtualizacao: string
}