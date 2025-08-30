'use client'

import { Edit2, Trash2, TrendingUp, TrendingDown } from 'lucide-react'
import { useCarteira } from './CarteirProvider'
import { EditAtivoModal } from './EditAtivoModal'

export function CarteiraTable() {
  const { carteira, loading, removerAtivo, setEditingAtivo } = useCarteira()

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value)

  const formatPercent = (value: number) => 
    `${value > 0 ? '+' : ''}${value.toFixed(2)}%`

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="grid grid-cols-8 gap-4">
              {[...Array(8)].map((_, j) => (
                <div key={j} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Minha Carteira</h2>
          <span className="text-sm text-gray-500">
            {carteira.length} ativos
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Ativo</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-700">Preço</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-700">Atual</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-700">Meta</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-700">Comprar</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-700">Valor Atual</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-700">Variação</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {carteira.map((item) => (
                <tr key={item.nome} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-2">
                    <div>
                      <div className="font-medium text-gray-900">{item.nome}</div>
                      <div className="text-sm text-gray-500">{item.tipo}</div>
                    </div>
                  </td>
                  <td className="text-right py-4 px-2 font-medium">
                    {formatCurrency(item.preco)}
                  </td>
                  <td className="text-right py-4 px-2">
                    {item.qtdAtual}
                  </td>
                  <td className="text-right py-4 px-2">
                    {item.qtdMeta}
                  </td>
                  <td className="text-right py-4 px-2">
                    <span className={`font-medium ${item.qtdComprar > 0 ? 'text-orange-600' : 'text-success-600'}`}>
                      {item.qtdComprar}
                    </span>
                  </td>
                  <td className="text-right py-4 px-2 font-medium">
                    {formatCurrency(item.valorAtual)}
                  </td>
                  <td className="text-right py-4 px-2">
                    <div className={`flex items-center justify-end space-x-1 ${
                      item.variacao >= 0 ? 'text-success-600' : 'text-error-600'
                    }`}>
                      {item.variacao >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="font-medium">
                        {formatPercent(item.variacao)}
                      </span>
                    </div>
                  </td>
                  <td className="text-center py-4 px-2">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => setEditingAtivo({
                          id: item.nome,
                          ativo: item.ativo || `${item.nome}.SA`,
                          nome: item.nome,
                          tipo: item.tipo,
                          qtdAtual: item.qtdAtual,
                          qtdMeta: item.qtdMeta
                        })}
                        className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                        title="Editar ativo"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removerAtivo(item.nome)}
                        className="p-1 text-gray-400 hover:text-error-600 transition-colors"
                        title="Remover ativo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {carteira.length === 0 && !loading && (
          <div className="text-center py-12">
            <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum ativo na carteira
            </h3>
            <p className="text-gray-500 mb-4">
              Adicione seu primeiro ativo para começar a acompanhar seus investimentos
            </p>
          </div>
        )}
      </div>
      
      <EditAtivoModal />
    </>
  )
}