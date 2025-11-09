import { useEffect, useState } from "react";

export default function NewsPortal() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // هنا نحط نفس رابط الـ API بتاع SheetDB اللي استخدمتيه في AddNews
    fetch("https://sheetdb.io/api/v1/rknvsoqikajg6")
      .then((res) => res.json())
      .then((data) => {
        // ترتيب الأخبار الأحدث أولًا
        const sorted = data.sort((a, b) => b.id - a.id);
        setNews(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-6">⏳ جاري تحميل الأخبار...</p>;

  return (
    <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50 min-h-screen">
      {news.length === 0 ? (
        <p className="text-center col-span-full">لا توجد أخبار حالياً 📰</p>
      ) : (
        news.map((item, index) => (
          <div key={index} className="bg-white border rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2 text-blue-700">{item.title}</h2>
              <p className="text-gray-700 mb-3">{item.content}</p>
              <p className="text-sm text-gray-500">{item.date}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
