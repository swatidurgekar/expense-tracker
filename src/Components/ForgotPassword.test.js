import { render, screen } from "@testing-library/react";
import ForgotPassword from "./ForgotPassword";

describe("ForgotPassword component", () => {
  test("renders MyWebLink as a text", () => {
    //arrange
    render(<ForgotPassword />);

    //act
    //...nothing

    //assert
    const MyWebLink = screen.getByText("MyWebLink");
    expect(MyWebLink).toBeInTheDocument();
  });
});
