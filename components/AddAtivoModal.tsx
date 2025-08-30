'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useCarteira } from './CarteirProvider'

export function AddAtivoModal() {
  const { showAddModal, setShowAddModal, adicionarAtivo } = useCarteira()
  const [formData, setFormData] = useState({
    ativo: '',
    nome: '',
    tipo: 'Ação' as 'Ação' | 'FII',
    qtdAtual: 0,
    qtdMeta: 0
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.ativo || !formData.nome) {
      alert('Por favor, preencha todos os campos obrigatórios')
      return
    }

    adicionarAtivo(formData)
    setFormData({
      ativo: '',
      nome: '',
      tipo: 'Ação',
      qtdAtual: 0,
      qtdMeta: 0
    })
    setShowAddModal(false)
  }

  const handleClose = () => {
    setShowAddModal(false)
    setFormData({
      ativo: '',
      nome: '',
      tipo: 'Ação',
      qtdAtual: 0,
      qtdMeta: 0
    })
  }

  if (!showAddModal) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Adicionar Ativo</h2>
          <button
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código do Ativo *
            </label>
            <input
              type="text"
              value={formData.ativo}
              onChange={(e) => setFormData(prev => ({ ...prev, ativo: e.target.value }))}
              placeholder="Ex: BBAS3.SA"
              className="input-field"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Use o formato completo (ex: BBAS3.SA para ações, SPXS11.SA para FIIs)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Ativo *
            </label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
              placeholder="Ex: BBAS3"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo
            </label>
            <select
              value={formData.tipo}
              onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value as 'Ação' | 'FII' }))}
              className="input-field"
            >
              <option value="Ação">Ação</option>
              <option value="FII">FII</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantidade Atual
              </label>
              <input
                type="number"
                min="0"
                value={formData.qtdAtual}
                onChange={(e) => setFormData(prev => ({ ...prev, qtdAtual: parseInt(e.target.value) || 0 }))}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta
              </label>
              <input
                type="number"
                min="0"
                value={formData.qtdMeta}
                onChange={(e) => setFormData(prev => ({ ...prev, qtdMeta: parseInt(e.target.value) || 0 }))}
                className="input-field"
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}