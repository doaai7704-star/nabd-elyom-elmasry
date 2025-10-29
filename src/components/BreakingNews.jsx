import React, { useEffect, useRef } from 'react'
import { breaking } from '../data/breakingNews'

export default function BreakingNews(){
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    let idx = 0
    const span = el.querySelector('.items')
    const advance = () => {
      idx = (idx + 1) % breaking.length
      span.style.transform = `translateX(-${idx * 100}%)`
    }
    const iv = setInterval(advance, 3000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="breaking">
      <div className="container mx-auto px-4 py-2 flex items-center gap-3 overflow-hidden">
        <div className="flex items-center">
          <span className="dot mr-2"></span>
          <span className="text-sm font-semibold">أخبار عاجلة</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <div ref={ref} className="relative">
            <div className="flex transition-transform duration-700 items">
              {breaking.map((b,i)=>(
                <div key={i} className="min-w-full px-4 text-sm text-slate-700">{b}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
