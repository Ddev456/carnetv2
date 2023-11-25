import React from "react";
import { getCategories } from "../../../app/categories/category.query";
import { CategoryCard } from "../../../app/categories/CategoryCard";

export const CategoryView = async () => {
  const { categories, totalCategories } = await getCategories({});
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard category={category} key={category.id} />
      ))}
    </div>
  );
};
