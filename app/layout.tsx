import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Carteira de Investimentos',
  description: 'Gerencie sua carteira de ações e FIIs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}