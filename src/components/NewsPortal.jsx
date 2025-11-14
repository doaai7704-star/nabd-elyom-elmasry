import { useEffect, useState } from "react";

export default function NewsPortal({ category }) {
  const [news, setNews] = useState([]);
  const sheetURL =
    "https://docs.google.com/spreadsheets/d/معرف-الملف/pub?output=csv"; // ضع رابط الشيت هنا

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(sheetURL);
        const text = await response.text();
        const rows = text.split("\n").slice(1);
        const parsed = rows
          .map((row) => {
            const [title, description, image, date, link, cat] = row.split(",");
            if (!title) return null;
            return { title, description, image, date, link, cat };
          })
          .filter(Boolean);
        setNews(parsed);
      } catch (error) {
        console.error("Error loading sheet data:", error);
      }
    }
    fetchData();
  }, []);

  // فلترة حسب القسم
  const filteredNews =
    category === "الكل" ? news : news.filter((n) => n.cat === category);

  if (filteredNews.length === 0)
    return <p className="text-center text-gray-500 mt-10">لا توجد أخبار.</p>;

  const [mainNews, ...otherNews] = filteredNews;

  return (
    <div className="p-4 space-y-8">
      {/* الخبر الرئيسي */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <img
          src={mainNews.image}
          alt={mainNews.title}
          className="w-full h-[450px] object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {mainNews.title}
          </h2>
          <p className="text-gray-200 mb-4 max-w-2xl">{mainNews.description}</p>
          {mainNews.link && (
            <a
              href={mainNews.link}
              target="_blank"
              rel="noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md w-fit"
            >
              اقرأ المزيد →
            </a>
          )}
        </div>
      </div>

      {/* باقي الأخبار */}
      <div className="grid md:grid-cols-3 gap-6">
        {otherNews.slice(0, 9).map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <p className="text-gray-400 text-xs mb-3">{item.date}</p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-600 hover:underline font-medium text-sm"
                >
                  اقرأ المزيد →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
