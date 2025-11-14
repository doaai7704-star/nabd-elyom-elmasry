import React, { useState, useEffect } from "react";

export default function App() {
  const [news, setNews] = useState([]);
  const [newNews, setNewNews] = useState({
    title: "",
    content: "",
    img: "",
    category: "عام",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["الكل", "سياسة", "اقتصاد", "رياضة", "فن", "حوادث", "عام"];

  // ✅ جلب الأخبار من السيرفر
  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("http://localhost:3000/get-news");
        const data = await res.json();
        setNews(data.data || data);
      } catch (err) {
        console.error("❌ خطأ في جلب الأخبار:", err);
      }
    }
    fetchNews();
  }, []);

  // إضافة أو تعديل خبر
  const handleAddNews = async (e) => {
    e.preventDefault();
    if (!newNews.title || !newNews.content) return alert("أدخل جميع البيانات");

    const today = new Date().toISOString().split("T")[0];
    const newsToSend = { 
      العنوان: newNews.title, 
      المحتوي: newNews.content, 
      الصوره: newNews.img, 
      القسم: newNews.category, 
      التاريخ: today 
    };

    try {
      if (editIndex !== null) {
        // تعديل الخبر على السيرفر
        const id = news[editIndex].id;
        await fetch(`http://localhost:3000/update-news/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newsToSend),
        });
      } else {
        // إضافة خبر جديد
        await fetch("http://localhost:3000/add-news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: [newsToSend] }),
        });
      }

      // إعادة جلب الأخبار بعد الإضافة أو التعديل
      const updatedRes = await fetch("http://localhost:3000/get-news");
      const updatedData = await updatedRes.json();
      setNews(updatedData.data || updatedData);

      setNewNews({ title: "", content: "", img: "", category: "عام" });
      setEditIndex(null);
    } catch (err) {
      console.error("❌ خطأ أثناء إرسال الخبر:", err);
      alert("لم يتم إرسال الخبر");
    }
  };

  // حذف خبر
  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الخبر؟")) {
      try {
        await fetch(`http://localhost:3000/delete-news/${id}`, {
          method: "DELETE",
        });
        setNews(news.filter((n) => n.id !== id));
      } catch (err) {
        console.error("❌ خطأ أثناء حذف الخبر:", err);
        alert("لم يتم حذف الخبر");
      }
    }
  };

  const handleEdit = (index) => {
    setNewNews({
      title: news[index].العنوان,
      content: news[index].المحتوي,
      img: news[index].الصوره,
      category: news[index].القسم,
    });
    setEditIndex(index);
  };

  const filteredNews = news.filter(
    (item) =>
      (selectedCategory === "الكل" || item.القسم === selectedCategory) &&
      (item.العنوان.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.المحتوي.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* رأس الصفحة */}
      <header className="bg-blue-700 text-white py-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold tracking-wide">نبض اليوم المصري</h1>
          {!isAdmin ? (
            <button
              onClick={() => {
                const pass = prompt("أدخل كلمة السر للمحرر:");
                if (pass === "admin123") setIsAdmin(true);
                else alert("كلمة السر غير صحيحة!");
              }}
              className="bg-white text-blue-700 font-semibold px-3 py-1 rounded hover:bg-blue-100 transition"
            >
              دخول المحرر
            </button>
          ) : (
            <button
              onClick={() => setIsAdmin(false)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
            >
              تسجيل الخروج
            </button>
          )}
        </div>

        {/* شريط التصنيفات */}
        <nav className="bg-blue-600 text-white flex justify-center flex-wrap border-t border-blue-400 mt-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 m-1 font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-white text-blue-700 rounded-t-lg"
                  : "hover:bg-blue-500 rounded-t-lg"
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </header>

      {/* مربع البحث */}
      <div className="flex justify-center mt-6">
        <input
          type="text"
          placeholder="ابحث عن خبر..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* قسم إضافة الأخبار */}
      {isAdmin && (
        <section className="container mx-auto px-4 py-6 bg-white shadow-md mt-6 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            {editIndex !== null ? "✏️ تعديل الخبر" : "📰 أضف خبر جديد"}
          </h2>
          <form onSubmit={handleAddNews} className="grid gap-4 md:grid-cols-3">
            <input
              type="text"
              placeholder="عنوان الخبر"
              className="border rounded p-2"
              value={newNews.title}
              onChange={(e) =>
                setNewNews({ ...newNews, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="رابط صورة الخبر"
              className="border rounded p-2"
              value={newNews.img}
              onChange={(e) => setNewNews({ ...newNews, img: e.target.value })}
            />
            <select
              className="border rounded p-2"
              value={newNews.category}
              onChange={(e) =>
                setNewNews({ ...newNews, category: e.target.value })
              }
            >
              {categories.slice(1).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <textarea
              placeholder="تفاصيل الخبر..."
              className="border rounded p-2 col-span-full"
              rows="3"
              value={newNews.content}
              onChange={(e) =>
                setNewNews({ ...newNews, content: e.target.value })
              }
            />
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white rounded py-2 px-4 transition-colors col-span-full"
            >
              {editIndex !== null ? "تحديث الخبر" : "إضافة الخبر"}
            </button>
          </form>
        </section>
      )}

      {/* عرض الأخبار */}
      <main className="container mx-auto px-4 py-8 grid gap-6 md:grid-cols-3">
        {filteredNews.length === 0 ? (
          <p className="text-center col-span-full text-gray-600">
            لا توجد أخبار في هذا القسم حالياً.
          </p>
        ) : (
          filteredNews.map((item, index) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-t-4 border-blue-600"
            >
              {item.الصوره && (
                <img
                  src={item.الصوره}
                  alt={item.العنوان}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
              )}
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                {item.العنوان}
              </h3>
              <p className="text-gray-700 mb-3">{item.المحتوي}</p>
              <p className="text-sm text-blue-600 mb-3">
                التصنيف: {item.القسم}
              </p>

              {isAdmin && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    حذف
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </main>

      {/* الفوتر */}
      <footer className="bg-blue-800 text-white text-center py-3 mt-6">
        <p>© 2025 نبض اليوم المصري - جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
}
