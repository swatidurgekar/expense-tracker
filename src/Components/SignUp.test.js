import { queryAllByText, render, screen } from "@testing-library/react";
import SignUp from "./SignUp";
import { Provider } from "react-redux";
import store from "./Store";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("signup component", () => {
  test("email text", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );
    const email = screen.getByText("Email");
    expect(email).toBeInTheDocument();
  });

  test("email text not", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );
    const button = screen.getByText("Forgot password?");
    userEvent.click(button);

    const res = screen.queryByText("Dont't have an account? SignUp");
    expect(res).not.toBeInTheDocument();
  });
});
