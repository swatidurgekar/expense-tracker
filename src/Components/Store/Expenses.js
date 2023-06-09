import { createSlice } from "@reduxjs/toolkit";

const initialState = { expenses: [] };

const ExpensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense(state, action) {
      state.expenses.push(action.payload);
    },
    fetchExpense(state, action) {
      state.expenses = action.payload;
    },
  },
});

export const expensesActions = ExpensesSlice.actions;
export default ExpensesSlice.reducer;
