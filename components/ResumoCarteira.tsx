'use client'

import { PieChart, TrendingUp, Target, DollarSign } from 'lucide-react'
import { useCarteira } from './CarteirProvider'

export function ResumoCarteira() {
  const { resumo, loading } = useCarteira()

  if (loading || !resumo) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valor Total</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(resumo.valorTotalCarteira)}
              </p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Meta Total</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(resumo.custoTotalMeta)}
              </p>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <Target className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Necessário Investir</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(resumo.necessarioInvestir)}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Ativos</p>
              <p className="text-2xl font-bold text-gray-900">
                {resumo.qtdTotalAtivos}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <PieChart className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição por Tipo</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Ações</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${resumo.percAcoes}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-12">
                  {resumo.percAcoes}%
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">FIIs</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-success-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${resumo.percFiis}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-12">
                  {resumo.percFiis}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Valores por Categoria</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Ações</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(resumo.subtotalAcoes)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">FIIs</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(resumo.subtotalFiis)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        Última atualização: {resumo.ultimaAtualizacao}
      </div>
    </div>
  )
}