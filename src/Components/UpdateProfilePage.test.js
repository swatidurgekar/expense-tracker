import { render, screen } from "@testing-library/react";
import UpdateProfilePage from "./UpdateProfilePage";
import { Provider } from "react-redux";
import store from "./Store";

describe("updateProfilePage component", () => {
  test("renders Contact Details as a text", () => {
    //arrange
    render(
      <Provider store={store}>
        <UpdateProfilePage />
      </Provider>
    );

    //act
    //...nothing

    //assert
    const contactDetails = screen.getByText("Contact Details");
    expect(contactDetails).toBeInTheDocument();
  });
});
