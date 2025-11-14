import { useState } from "react";
import Header from "./components/Header";
import NewsPortal from "./components/NewsPortal";

function App() {
  const [category, setCategory] = useState("الكل");

  return (
    <div className="min-h-screen bg-gray-100">
      <Header setCategory={setCategory} />
      <h1 className="text-4xl font-bold text-center py-6 text-gray-800">
        بوابة الأخبار
      </h1>
      <NewsPortal category={category} />
    </div>
  );
}

export default App;
