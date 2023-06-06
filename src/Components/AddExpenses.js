import "./AddExpenses.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const AddExpenses = () => {
  const url = "https://react-expense-tracker-e1978-default-rtdb.firebaseio.com";
  const money = useRef();
  const description = useRef();
  const category = useRef();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function getExpenses() {
      const res = await axios.get(`${url}/expenses.json`);
      const expenses = Object.values(res.data);
      setExpenses(expenses);
    }
    getExpenses();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredMoney = money.current.value;
    const enteredDesc = description.current.value;
    const enteredCategory = category.current.value;
    const newExpense = { enteredMoney, enteredDesc, enteredCategory };

    axios.post(`${url}/expenses.json`, newExpense).then((res) => {
      if (res.statusText) {
        setExpenses((prevExpense) => {
          return [...prevExpense, newExpense];
        });
      }
    });
  };

  return (
    <div className="add-expenses-div">
      <h6 className="add-expenses-header">Add income and expenses daily</h6>
      <div className="add-expenses-form">
        <Form>
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
              <option value="grocery">Grocery</option>
              <option value="food">Food</option>
              <option value="petrol">Petrol</option>
            </Form.Select>
          </Form.Group>
          <Button onClick={submitHandler} type="submit">
            Add expense
          </Button>
        </Form>
      </div>
      {expenses && (
        <div className="expenses">
          <h5>Expenses</h5>
          <hr />
          {expenses.map((item) => {
            return (
              <div key={item.enteredDesc}>
                <li>{`${item.enteredMoney}$ ${item.enteredDesc} ${item.enteredCategory}`}</li>
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
