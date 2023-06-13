import { render, screen } from "@testing-library/react";
import UpdateProfilePage from "./UpdateProfilePage";
import { Provider } from "react-redux";
import store from "./Store";

describe("updateProfilePage component", () => {
  test("renders Contact Details as a text", () => {
    render(
      <Provider store={store}>
        <UpdateProfilePage />
      </Provider>
    );
    const contactDetails = screen.getByText("Contact Details");
    expect(contactDetails).toBeInTheDocument();
  });
});
