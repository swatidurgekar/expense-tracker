import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext({
  islogin: "",
  isLoggedIn: "",
  idToken: "",
  editing: "",
  editingKey: "",
  logout: () => {},
  addExpense: () => {},
  edit: () => {},
});

export const AuthContextProvider = (props) => {
  const url = "https://react-expense-tracker-e1978-default-rtdb.firebaseio.com";
  const token = localStorage.getItem("idToken");
  const [editing, setEditing] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [islogin, setIsLogin] = useState();
  const [idToken, setIdToken] = useState(token);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function getExpenses() {
      const res = await axios.get(`${url}/expenses.json`);
      if (res.data) {
        const expenses = Object.values(res.data);
        setExpenses(expenses);
      }
    }
    getExpenses();
  }, [expenses]);

  const login = () => {
    setIsLogin(true);
  };

  const logoutHandler = () => {
    setIsLogin(false);
    setIdToken("");
  };

  const addExpense = (expense) => {
    {
      editing && axios.put(`${url}/expenses/${editingKey}.json`, expense);
    }
    {
      !editing && axios.post(`${url}/expenses.json`, expense);
    }
    setEditing(false);
  };

  const edit = () => {
    setEditing(true);
  };

  const editKey = (key) => {
    setEditingKey(key);
  };

  const authContext = {
    expenses: expenses,
    islogin: !!idToken,
    isLoggedIn: login,
    idToken: idToken,
    logout: logoutHandler,
    addExpense: addExpense,
    editing: editing,
    edit: edit,
    editingKey: editingKey,
    editKey: editKey,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};
