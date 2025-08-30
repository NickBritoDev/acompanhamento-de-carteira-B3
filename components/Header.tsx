'use client'

import { TrendingUp, Plus, RefreshCw } from 'lucide-react'
import { useCarteira } from './CarteirProvider'

export function Header() {
  const { atualizarCarteira, loading, setShowAddModal } = useCarteira()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Carteira de Investimentos
              </h1>
              <p className="text-gray-600">
                Gerencie seus ativos e acompanhe seu portfólio
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={atualizarCarteira}
              disabled={loading}
              className="btn-secondary flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Atualizar</span>
            </button>
            
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Ativo</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}