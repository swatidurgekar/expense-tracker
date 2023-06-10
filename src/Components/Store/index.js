import { configureStore } from "@reduxjs/toolkit";
import Auth from "./Auth";
import Expenses from "./Expenses";
import Theme from "./Theme";

const store = configureStore({
  reducer: { auth: Auth, expense: Expenses, theme: Theme },
});

export default store;
