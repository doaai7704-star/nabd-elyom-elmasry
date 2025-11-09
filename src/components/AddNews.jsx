import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddNews() {
  const [formData, setFormData] = useState({
    العنوان: "",
    القسم: "",
    المحتوي: "",
    الصوره: "",
    التاريخ: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // لو التاريخ فاضي نحط تاريخ اليوم تلقائي
    const today = new Date().toISOString().split("T")[0];
    const dataToSend = {
      ...formData,
      التاريخ: formData["التاريخ"] || today,
    };

    try {
      // 👇 تعديل هنا: بدل sheetdb استخدم السيرفر المحلي
      const response = await fetch("http://localhost:3000/add-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      console.log("✅ Response from backend:", result);

      if (response.ok) {
        alert("✅ تم إضافة الخبر بنجاح!");
        navigate("/news"); // يرجع لصفحة عرض الأخبار
      } else {
        alert("❌ حدث خطأ أثناء الإرسال للسيرفر.");
      }
    } catch (error) {
      console.error("⚠️ خطأ أثناء الاتصال بالسيرفر:", error);
      alert("⚠️ لم يتم الاتصال بالسيرفر.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        📰 إضافة خبر جديد
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="العنوان"
          placeholder="العنوان"
          value={formData["العنوان"]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="القسم"
          placeholder="القسم"
          value={formData["القسم"]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <textarea
          name="المحتوي"
          placeholder="المحتوي"
          value={formData["المحتوي"]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="4"
          required
        />

        <input
          type="text"
          name="الصوره"
          placeholder="رابط صورة الخبر"
          value={formData["الصوره"]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="date"
          name="التاريخ"
          value={formData["التاريخ"]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          ➕ إضافة الخبر
        </button>
      </form>
    </div>
  );
}
