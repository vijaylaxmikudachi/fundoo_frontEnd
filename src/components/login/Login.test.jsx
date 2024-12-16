import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";


const renderComponent = () =>
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

describe("Login Component", () => {
  test("renders email, password fields, and login button", () => {
    renderComponent();

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByText(/Forgot password\?/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Create account/i })).toBeInTheDocument();
  });

  test("allows user to type in email and password fields", () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    expect(emailInput).toHaveValue("user@example.com");
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput).toHaveValue("password123");
  });

  test("displays error messages for invalid inputs on form submission", () => {
    renderComponent();
    const loginButton = screen.getByRole("button", { name: /Login/i });
    fireEvent.click(loginButton);
    expect(screen.getByText(/Enter valid email address./i)).toBeInTheDocument();
    expect(screen.getByText(/Enter Valid Password./i)).toBeInTheDocument();
  });

  test("calls handleSubmit when valid inputs are provided", () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole("button", { name: /Login/i });
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);
    expect(screen.queryByText(/Enter valid email address./i)).toBeNull();
    expect(screen.queryByText(/Enter Valid Password./i)).toBeNull();

  });
});
