import { NextRequest, NextResponse } from 'next/server'
import { obterDadosAtivo } from '@/lib/yahoo-finance'
import { Ativo, AtivoCompleto, ResumoCarteira } from '@/types/carteira'

export async function POST(request: NextRequest) {
  try {
    const { ativos }: { ativos: Ativo[] } = await request.json()

    let subtotalAcoes = 0
    let subtotalFiis = 0
    let qtdTotalAtivos = 0
    let valorTotalCarteira = 0
    let custoTotalMeta = 0

    const resultado: AtivoCompleto[] = []

    for (const item of ativos) {
      const dados = await obterDadosAtivo(item.ativo)

      const valorAtual = item.qtdAtual * dados.preco
      const qtdComprar = item.qtdMeta - item.qtdAtual
      const custoTotal = item.qtdMeta * dados.preco

      resultado.push({
        ...item,
        preco: dados.preco,
        valorAtual,
        qtdComprar,
        custoTotal,
        variacao: dados.variacao,
        pvp: dados.pvp,
        roe: dados.roe,
        dy: dados.dy,
      })

      qtdTotalAtivos += item.qtdAtual
      valorTotalCarteira += valorAtual
      custoTotalMeta += custoTotal

      if (item.tipo === 'Ação') subtotalAcoes += valorAtual
      if (item.tipo === 'FII') subtotalFiis += valorAtual

      // Pequeno delay para evitar rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    const resumo: ResumoCarteira = {
      subtotalAcoes,
      subtotalFiis,
      qtdTotalAtivos,
      valorTotalCarteira,
      necessarioInvestir: custoTotalMeta - valorTotalCarteira,
      custoTotalMeta,
      percAcoes: ((subtotalAcoes / valorTotalCarteira) * 100).toFixed(1),
      percFiis: ((subtotalFiis / valorTotalCarteira) * 100).toFixed(1),
      ultimaAtualizacao: new Date().toLocaleString('pt-BR'),
    }

    return NextResponse.json({
      carteira: resultado,
      resumo
    })
  } catch (error) {
    console.error('❌ Erro na API /carteira:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar carteira' },
      { status: 500 }
    )
  }
}