import "./AddExpenses.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useRef, useState } from "react";
// const axios = require("axios/dist/node/axios.cjs");
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "./Store/Expenses";
import { themeActions } from "./Store/Theme";

const AddExpenses = () => {
  const url = "https://react-expense-tracker-e1978-default-rtdb.firebaseio.com";
  const money = useRef();
  const description = useRef();
  const category = useRef();
  const [editing, setEditing] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [premium, setPremium] = useState(false);
  const dispatch = useDispatch();
  const addedExpense = useSelector((state) => state.expense.expenses);
  const theme = useSelector((state) => state.theme.theme);
  const email = useSelector((state) => state.auth.email);

  let newEmail;
  if (email) {
    newEmail = email.replace(/[@.]/g, "");
  }

  useEffect(() => {
    async function getExpenses() {
      const res = await axios.get(`${url}/${newEmail}.json`);
      if (res.data) {
        const expenses = Object.values(res.data);
        dispatch(expensesActions.fetchExpense(expenses));
      }
    }
    getExpenses();
  }, []);

  useEffect(() => {
    let sum = 0;
    function getExpenses() {
      addedExpense.forEach((element) => {
        sum += +element.enteredMoney;
      });
      if (sum >= 10000) {
        setPremium(true);
      } else {
        setPremium(false);
        deactivate();
      }
    }
    getExpenses();
  }, [addedExpense]);

  const deleteExpense = async (item) => {
    const res = await axios.get(`${url}/${newEmail}.json`);
    const keys = Object.keys(res.data);
    keys.map((expenseKey) => {
      if (res.data[expenseKey].enteredDesc === item.enteredDesc) {
        axios.delete(`${url}/${newEmail}/${expenseKey}.json`).then(() => {
          const newRes = axios.get(`${url}/${newEmail}.json`).then((res) => {
            if (res.data) {
              const newExpense = Object.values(res.data);
              dispatch(expensesActions.fetchExpense(newExpense));
            } else {
              dispatch(expensesActions.fetchExpense([]));
            }
          });
        });
      }
    });
  };

  const editExpense = async (item) => {
    setEditing(true);
    money.current.value = item.enteredMoney;
    description.current.value = item.enteredDesc;
    category.current.value = item.enteredCategory;
    const res = await axios.get(`${url}/${newEmail}.json`);
    const keys = Object.keys(res.data);
    keys.map((expenseKey) => {
      if (res.data[expenseKey].enteredDesc === item.enteredDesc) {
        setEditingKey(expenseKey);
      }
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredMoney = money.current.value;
    const enteredDesc = description.current.value;
    const enteredCategory = category.current.value;
    const newExpense = { enteredMoney, enteredDesc, enteredCategory };

    if (editing) {
      axios
        .put(`${url}/${newEmail}/${editingKey}.json`, newExpense)
        .then(() => {
          axios.get(`${url}/${newEmail}.json`).then((res) => {
            const newExpense = Object.values(res.data);
            dispatch(expensesActions.fetchExpense(newExpense));
          });
        });
    } else {
      dispatch(expensesActions.addExpense(newExpense));
      axios.post(`${url}/${newEmail}.json`, newExpense).then(() => {
        axios.get(`${url}/${newEmail}.json`).then((res) => {});
      });
    }
    setEditing(false);
    setEditingKey(null);
  };

  const darkMode = () => {
    dispatch(themeActions.dark());
  };

  const lightMode = () => {
    dispatch(themeActions.light());
  };

  const activatePremiumFunction = () => {
    dispatch(themeActions.dark());
  };

  const deactivate = () => {
    dispatch(themeActions.light());
  };

  const download = (rows) => {
    const arr = [];
    rows.map((element) => {
      arr.push([JSON.stringify(element)]);
    });
    return arr.map((exp) => exp.join(",")).join("\n");
  };

  const blob = new Blob([download(addedExpense)]);
  const href = URL.createObjectURL(blob);

  return (
    <div className={theme ? "dark-add-expenses-div" : "add-expenses-div"}>
      {premium && (
        <div>
          {!theme && <button onClick={darkMode}>Dark mode</button>}
          {theme && <button onClick={lightMode}>Light mode</button>}
        </div>
      )}
      <h6
        className={theme ? "dark-add-expenses-header" : "add-expenses-header"}
      >
        Add income and expenses daily
      </h6>
      <div className={theme ? "dark-add-expenses-form" : "add-expenses-form"}>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <label>Money spent</label>
            <Form.Control ref={money} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <label>Description</label>
            <Form.Control ref={description} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <label>Category</label>
            <Form.Select ref={category}>
              <option>Select category</option>
              <option value="grocery">Grocery</option>
              <option value="food">Food</option>
              <option value="petrol">Petrol</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit">Add expense</Button>
        </Form>
      </div>
      {addedExpense && (
        <div className="expenses">
          <h5>Expenses</h5>
          <hr />
          {addedExpense.map((item) => {
            return (
              <div key={item.enteredDesc}>
                <li>
                  {`${item.enteredMoney}$ ${item.enteredDesc} ${item.enteredCategory}`}

                  <button
                    onClick={() => {
                      editExpense(item);
                    }}
                    className="expense-edit-button"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => deleteExpense(item)}
                    className="expense-delete-button"
                  >
                    DELETE
                  </button>
                </li>

                <hr />
              </div>
            );
          })}
          {premium && (
            <div>
              <button onClick={activatePremiumFunction}>
                ACTIVATE PREMIUM
              </button>

              <a href={href} download="file.csv">
                Download expenses
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddExpenses;
