import { useEffect, useState } from "react";

export default function NewsList() {
  const [news, setNews] = useState([]);

  // ✅ جلب الأخبار من السيرفر المحلي بدل Google Sheet مباشرة
  useEffect(() => {
    fetch("http://localhost:3000/get-news")
      .then((res) => res.json())
      .then((data) => {
        // ترتيب الأخبار من الأحدث إلى الأقدم (حسب التاريخ أو الإدخال الأخير)
        const sorted = data.reverse();
        setNews(sorted);
      })
      .catch((err) => console.error("❌ خطأ في تحميل الأخبار:", err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        📰 أحدث الأخبار
      </h2>
      {news.length === 0 ? (
        <p className="text-center text-gray-500">⏳ جاري تحميل الأخبار...</p>
      ) : (
        <div className="grid gap-6">
          {news.map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              {item["الصوره"] && (
                <img
                  src={item["الصوره"]}
                  alt={item["العنوان"]}
                  className="w-full h-64 object-cover rounded-lg mb-3"
                />
              )}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {item["العنوان"]}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                🗓️ {item["التاريخ"] || ""}
              </p>
              <p className="text-gray-700 whitespace-pre-line">
                {item["المحتوي"]}
              </p>
              <p className="text-blue-500 mt-2 text-sm">{item["القسم"]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
