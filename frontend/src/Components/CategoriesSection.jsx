import React from "react";

const categories = [
  { name: "Healthcare", icon: "📈" },
  { name: "Education", icon: "🎓" },
  { name: "Tourism", icon: "🧳" },
  { name: "Food", icon: "🍔" },
  { name: "Fintech", icon: "💹" },
  { name: "Legal", icon: "⚖️" }
];

const CategoriesSection = () => {
  return (
    <div className="py-20 px-8 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold text-orange-500 mb-10">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {categories.map((category) => (
          <div key={category.name} className="bg-yellow-200 p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">{category.icon}</div>
            <h3 className="text-xl font-semibold">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
