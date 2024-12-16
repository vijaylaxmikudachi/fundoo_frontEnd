import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Registration from "./Registration";

const renderComponent = () =>
  render(
    <BrowserRouter>
      <Registration />
    </BrowserRouter>
  );

describe("Registration Component", () => {
  test("renders input fields and Register button", () => {
    renderComponent();

    // Use getByLabelText for MUI TextField components
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-password-input")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Register/i })).toBeInTheDocument();
  });

  test("allows user to type in input fields", () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "User" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByTestId("confirm-password-input"), {
      target: { value: "password123" },
    });

    expect(screen.getByLabelText(/First Name/i)).toHaveValue("Test");
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue("User");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("test@example.com");
    expect(screen.getByTestId("password-input")).toHaveValue("password123");
    expect(screen.getByTestId("confirm-password-input")).toHaveValue("password123");
  });
});
