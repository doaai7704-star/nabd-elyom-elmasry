import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-white border-t mt-6">
      <div className="container mx-auto px-4 py-6 text-sm text-slate-500">
        © {new Date().getFullYear()} نبض اليوم المصري — جميع الحقوق محفوظة
      </div>
    </footer>
  )
}
