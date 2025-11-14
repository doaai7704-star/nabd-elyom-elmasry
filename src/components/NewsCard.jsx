import React from 'react'

export default function NewsCard({n}){
  return (
    <article className="bg-white rounded shadow-sm overflow-hidden">
      <img src={n.imageUrl} alt={n.title} className="w-full h-40 object-cover"/>
      <div className="p-3">
        <h3 className="font-semibold text-base mb-1" style={{color:'#c40000'}}>{n.title}</h3>
        <p className="text-sm text-slate-600">{n.summary}</p>
        <div className="text-xs text-slate-400 mt-2">{new Date(n.publishedAt).toLocaleString('ar-EG')}</div>
      </div>
    </article>
  )
}
