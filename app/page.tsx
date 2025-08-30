import { CarteiraProvider } from '@/components/CarteirProvider'
import { Header } from '@/components/Header'
import { CarteiraTable } from '@/components/CarteiraTable'
import { ResumoCarteira } from '@/components/ResumoCarteira'
import { AddAtivoModal } from '@/components/AddAtivoModal'

export default function Home() {
  return (
    <CarteiraProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="space-y-8">
            <ResumoCarteira />
            <CarteiraTable />
          </div>
        </main>
        <AddAtivoModal />
      </div>
    </CarteiraProvider>
  )
}