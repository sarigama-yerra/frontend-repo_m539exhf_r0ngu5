import React from 'react'
import Header from './components/Header'
import Calculator from './components/Calculator'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.09),transparent_50%)]" />

      <div className="relative container mx-auto px-6 py-10">
        <Header />

        <div className="mt-6 flex justify-center">
          <Calculator />
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default App
