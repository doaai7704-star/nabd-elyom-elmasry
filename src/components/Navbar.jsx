import React from 'react'

export default function Navbar(){
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.svg" alt="نبض اليوم المصري" className="w-10 h-10"/>
          <div>
            <div className="text-lg font-extrabold" style={{color:'#c40000'}}>نبض اليوم المصري</div>
            <div className="text-xs text-slate-500">أخبار مصر والعالم</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-3 py-1 border rounded text-sm" aria-label="menu">القسم</button>
          <button className="px-3 py-1 rounded text-sm bg-red-600 text-white">التحكم</button>
        </div>
      </div>
    </header>
  )
}
