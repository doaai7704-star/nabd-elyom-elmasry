import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Header({ setCategory }) {
  const [news, setNews] = useState([]);
  const sheetURL =
    "https://docs.google.com/spreadsheets/d/معرف-الملف/pub?output=csv"; // ضع رابط الشيت هنا

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(sheetURL);
        const text = await res.text();
        const rows = text.split("\n").slice(1);
        const parsed = rows
          .map((r) => {
            const [title] = r.split(",");
            return title;
          })
          .filter(Boolean);
        setNews(parsed);
      } catch (error) {
        console.error("Error loading sheet data:", error);
      }
    }
    fetchNews();
  }, []);

  const categories = ["الكل", "سياسة", "اقتصاد", "رياضة", "فن", "حوادث", "عام"];

  return (
    <div>
      {/* شريط الأقسام */}
      <nav className="flex justify-center space-x-4 bg-white py-2 font-semibold text-gray-700 shadow">
        {categories.map((cat) => (
          <button
            key={cat}
            className="hover:text-red-600 transition"
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* شريط الأخبار العاجلة */}
      <div className="bg-red-600 text-white py-2 overflow-hidden relative rounded-xl">
        <div className="absolute left-0 top-0 bottom-0 flex items-center pl-4 font-bold bg-red-700 px-3">
          عاجل
        </div>

        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="whitespace-nowrap text-lg font-semibold pl-28"
        >
          {news.map((title, i) => (
            <span key={i} className="mx-8">
              🔴 {title}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
