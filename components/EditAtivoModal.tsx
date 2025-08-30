'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useCarteira } from './CarteirProvider'

export function EditAtivoModal() {
  const { editingAtivo, setEditingAtivo, editarAtivo } = useCarteira()
  const [formData, setFormData] = useState({
    ativo: '',
    nome: '',
    tipo: 'Ação' as 'Ação' | 'FII',
    qtdAtual: 0,
    qtdMeta: 0
  })

  useEffect(() => {
    if (editingAtivo) {
      setFormData({
        ativo: editingAtivo.ativo,
        nome: editingAtivo.nome,
        tipo: editingAtivo.tipo,
        qtdAtual: editingAtivo.qtdAtual,
        qtdMeta: editingAtivo.qtdMeta
      })
    }
  }, [editingAtivo])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.ativo || !formData.nome || !editingAtivo) {
      alert('Por favor, preencha todos os campos obrigatórios')
      return
    }

    editarAtivo(editingAtivo.id, formData)
    setEditingAtivo(null)
  }

  const handleClose = () => {
    setEditingAtivo(null)
  }

  if (!editingAtivo) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Editar Ativo</h2>
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
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}