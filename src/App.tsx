import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HomePage from '@/pages/HomePage'
import ScenarioPage from '@/pages/ScenarioPage'
import HistoryPage from '@/pages/HistoryPage'
import ComparePage from '@/pages/ComparePage'
import { seedDemoData } from '@/utils/seedData'

export default function App() {
  useEffect(() => {
    seedDemoData()
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scenario/:category/:slug" element={<ScenarioPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
