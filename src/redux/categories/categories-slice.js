import { createSlice } from '@reduxjs/toolkit';
import categoriesOperations from './categories-operations';

const initialState = {
  category: {
    costs: {
      1: 'одежда',
      2: 'еда',
      3: 'транспорт',
      4: 'спорт',
      5: 'дети',
      6: 'домашние животные',
      7: 'дом',
      8: 'образование',
      9: 'развлечения',
      10: 'здоровье',
      11: 'другие',
    },
    income: {
      1: 'регулярные доходы',
      2: 'нерегулярные доходы',
    },
  },
  error: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: {
    [categoriesOperations.categories.fulfilled](state, action) {
      state.category = action.payload.data;
      state.error = false;
    },

    [categoriesOperations.categories.rejected](state, action) {
      state.error = true;
    },
  },
});

export default categoriesSlice.reducer;
