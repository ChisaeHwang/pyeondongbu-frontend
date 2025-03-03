import React from "react";
import {
  MAIN_CATEGORIES,
  SUB_CATEGORIES,
  getMainCategoryColor,
  getMainCategoryHoverColor,
  getMainCategoryTextColor,
  getSubCategoryColor,
  getSubCategoryHoverColor,
  getSubCategoryTextColor,
} from "../../utils/categoryUtils";

interface CategorySelectorProps {
  mainCategory: string;
  subCategory: string;
  setMainCategory: (category: string) => void;
  setSubCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  mainCategory,
  subCategory,
  setMainCategory,
  setSubCategory,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-gray-400 text-sm mb-3">메인 카테고리</h3>
        <div className="flex flex-wrap gap-2">
          {MAIN_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setMainCategory(cat)}
              className={`px-4 py-2 text-sm rounded-md transition-colors min-h-[36px] active:translate-y-[1px] ${getMainCategoryColor(
                cat,
                mainCategory
              )} ${getMainCategoryHoverColor(
                cat,
                mainCategory
              )} ${getMainCategoryTextColor(cat, mainCategory)}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-gray-400 text-sm mb-3">서브 카테고리</h3>
        <div className="flex flex-wrap gap-2">
          {SUB_CATEGORIES[mainCategory].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSubCategory(cat)}
              className={`px-3 py-1 text-sm rounded-md transition-colors min-h-[32px] active:translate-y-[1px] ${getSubCategoryColor(
                cat,
                subCategory
              )} ${getSubCategoryHoverColor(
                cat,
                subCategory
              )} ${getSubCategoryTextColor(cat, subCategory)}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
