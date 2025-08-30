'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Ativo, AtivoCompleto, ResumoCarteira } from '@/types/carteira'
import { carteiraInicial } from '@/lib/carteira-data'

interface CarteiraContextType {
  carteira: AtivoCompleto[]
  resumo: ResumoCarteira | null
  loading: boolean
  error: string | null
  atualizarCarteira: () => Promise<void>
  adicionarAtivo: (ativo: Omit<Ativo, 'id'>) => void
  editarAtivo: (id: string, dados: Partial<Ativo>) => void
  removerAtivo: (id: string) => void
  showAddModal: boolean
  setShowAddModal: (show: boolean) => void
  editingAtivo: Ativo | null
  setEditingAtivo: (ativo: Ativo | null) => void
}

const CarteiraContext = createContext<CarteiraContextType | undefined>(undefined)

export function CarteiraProvider({ children }: { children: React.ReactNode }) {
  const [ativos, setAtivos] = useState<Ativo[]>(carteiraInicial)
  const [carteira, setCarteira] = useState<AtivoCompleto[]>([])
  const [resumo, setResumo] = useState<ResumoCarteira | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingAtivo, setEditingAtivo] = useState<Ativo | null>(null)

  const atualizarCarteira = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/carteira', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ativos })
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar carteira')
      }

      const dados = await response.json()
      setCarteira(dados.carteira)
      setResumo(dados.resumo)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const adicionarAtivo = (novoAtivo: Omit<Ativo, 'id'>) => {
    const id = Date.now().toString()
    setAtivos(prev => [...prev, { ...novoAtivo, id }])
  }

  const editarAtivo = (id: string, dados: Partial<Ativo>) => {
    setAtivos(prev => prev.map(ativo => 
      ativo.id === id ? { ...ativo, ...dados } : ativo
    ))
  }

  const removerAtivo = (id: string) => {
    setAtivos(prev => prev.filter(ativo => ativo.id !== id))
  }

  useEffect(() => {
    atualizarCarteira()
  }, [ativos])

  return (
    <CarteiraContext.Provider value={{
      carteira,
      resumo,
      loading,
      error,
      atualizarCarteira,
      adicionarAtivo,
      editarAtivo,
      removerAtivo,
      showAddModal,
      setShowAddModal,
      editingAtivo,
      setEditingAtivo
    }}>
      {children}
    </CarteiraContext.Provider>
  )
}

export function useCarteira() {
  const context = useContext(CarteiraContext)
  if (context === undefined) {
    throw new Error('useCarteira deve ser usado dentro de CarteiraProvider')
  }
  return context
}