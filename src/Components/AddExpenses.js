import "./AddExpenses.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "./Store/AuthContext";

const AddExpenses = () => {
  const url = "https://react-expense-tracker-e1978-default-rtdb.firebaseio.com";
  const money = useRef();
  const description = useRef();
  const category = useRef();
  // const [expenses, setExpenses] = useState([]);
  // const [editing, setEditing] = useState(false);
  const authCtx = useContext(AuthContext);

  // useEffect(() => {
  //   async function getExpenses() {
  //     const res = await axios.get(`${url}/expenses.json`);
  //     const expenses = Object.values(res.data);
  //     setExpenses(expenses);
  //   }
  //   getExpenses();
  // }, [expenses]);

  const deleteExpense = async (item) => {
    const res = await axios.get(`${url}/expenses.json`);
    const keys = Object.keys(res.data);
    keys.map((expenseKey) => {
      if (res.data[expenseKey].enteredDesc === item.enteredDesc) {
        axios.delete(`${url}/expenses/${expenseKey}.json`);
      }
    });
  };

  const editExpense = async (item) => {
    authCtx.edit();
    money.current.value = item.enteredMoney;
    description.current.value = item.enteredDesc;
    category.current.value = item.enteredCategory;
    const res = await axios.get(`${url}/expenses.json`);
    const keys = Object.keys(res.data);
    keys.map((expenseKey) => {
      if (res.data[expenseKey].enteredDesc === item.enteredDesc) {
        authCtx.editKey(expenseKey);
      }
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredMoney = money.current.value;
    const enteredDesc = description.current.value;
    const enteredCategory = category.current.value;
    const newExpense = { enteredMoney, enteredDesc, enteredCategory };

    authCtx.addExpense(newExpense);
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
      {authCtx.expenses && (
        <div className="expenses">
          <h5>Expenses</h5>
          <hr />
          {authCtx.expenses.map((item) => {
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
        </div>
      )}
    </div>
  );
};

export default AddExpenses;
