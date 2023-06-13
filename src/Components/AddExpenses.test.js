import { render, screen } from "@testing-library/react";
import AddExpenses from "./AddExpenses";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store";

describe("AddExpenses", () => {
  test("render expenses if request succeeds", async () => {
    window.URL.createObjectURL = jest.fn();
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [
        { enteredMoney: 12, enteredDesc: "milk", enteredCategory: "Petrol" },
      ],
    });
    render(
      <Provider store={store}>
        <AddExpenses />
      </Provider>
    );
    const addedExpenses = await screen.findAllByText("Expenses");
    expect(addedExpenses).not.toHaveLength(0);
  });
});
