import React from 'react'
import Navbar from '../components/Navbar'
import BreakingNews from '../components/BreakingNews'
import HeroCarousel from '../components/HeroCarousel'
import NewsCard from '../components/NewsCard'
import Footer from '../components/Footer'
import latest from '../data/latestNews'

export default function Home(){
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <BreakingNews />
      <Navbar />
      <main className="container mx-auto px-4 py-4">
        <section className="mb-6">
          <HeroCarousel />
        </section>

        <section>
          <h3 className="text-lg font-bold mb-3">آخر الأخبار</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {latest.map(n=> <NewsCard key={n._id} n={n} />)}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
