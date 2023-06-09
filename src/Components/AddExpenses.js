import "./AddExpenses.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
// import { AuthContext } from "./Store/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "./Store/Expenses";

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

  // const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function getExpenses() {
      const res = await axios.get(`${url}/expenses.json`);
      if (res.data) {
        const expenses = Object.values(res.data);
        dispatch(expensesActions.fetchExpense(expenses));
      }
    }
    getExpenses();
  }, []);

  const deleteExpense = async (item) => {
    const res = await axios.get(`${url}/expenses.json`);
    const keys = Object.keys(res.data);
    keys.map((expenseKey) => {
      if (res.data[expenseKey].enteredDesc === item.enteredDesc) {
        axios.delete(`${url}/expenses/${expenseKey}.json`).then(() => {
          const newRes = axios.get(`${url}/expenses.json`).then((res) => {
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
    const res = await axios.get(`${url}/expenses.json`);
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
      let sum = 0;
      axios.put(`${url}/expenses/${editingKey}.json`, newExpense).then(() => {
        axios.get(`${url}/expenses.json`).then((res) => {
          const newExpense = Object.values(res.data);
          dispatch(expensesActions.fetchExpense(newExpense));
          newExpense.forEach((element) => {
            sum += +element.enteredMoney;
          });
          if (sum >= 10000) {
            setPremium(true);
          }
        });
      });
    } else {
      let sum = 0;
      dispatch(expensesActions.addExpense(newExpense));
      axios.post(`${url}/expenses.json`, newExpense).then(() => {
        axios.get(`${url}/expenses.json`).then((res) => {
          const newExpense = Object.values(res.data);
          newExpense.forEach((element) => {
            sum += +element.enteredMoney;
          });
          if (sum >= 10000) {
            setPremium(true);
            console.log(sum);
          }
        });
      });
    }
    setEditing(false);
    setEditingKey(null);
  };

  return (
    <div className="add-expenses-div">
      <h6 className="add-expenses-header">Add income and expenses daily</h6>

      <div className="add-expenses-form">
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
          {premium && <button>ACTIVATE PREMIUM</button>}
        </div>
      )}
    </div>
  );
};

export default AddExpenses;
