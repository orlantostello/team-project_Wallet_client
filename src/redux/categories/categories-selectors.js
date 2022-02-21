const getAllCategories = state => state.categories.category;
const getCategoriesError = state => state.categories.error;

const categoriesSelectors = {
  getAllCategories,
  getCategoriesError,
};

export default categoriesSelectors;
