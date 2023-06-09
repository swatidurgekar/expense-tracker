import { configureStore } from "@reduxjs/toolkit";
import Auth from "./Auth";
import Expenses from "./Expenses";

const store = configureStore({
  reducer: { auth: Auth, expense: Expenses },
});

export default store;
