const getAllCategories = state => state.categories.result;
const getCategoriesError = state => state.categories.error;


const categoriesSelectors ={
    getAllCategories,
    getCategoriesError,

}


export default  categoriesSelectors;

