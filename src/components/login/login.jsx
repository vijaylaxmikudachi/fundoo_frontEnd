import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginApiCall } from "../../utils/Api";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    errors: { email: "", password: "" },
    loading: false,
  });
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let emailError = "";
    let passwordError = "";

    if (!validateEmail(formState.email)) {
      emailError = "Enter valid email address.";
    }
    if (!validatePassword(formState.password)) {
      passwordError = "Enter Valid Password.";
    }

    if (emailError || passwordError) {
      setFormState({
        ...formState,
        errors: { email: emailError, password: passwordError },
      });
      return;
    }

    setFormState({ ...formState, errors: { email: "", password: "" }, loading: true });

    try {
      const data = await loginApiCall({ email: formState.email, password: formState.password }, `user/login`);
      console.log(data);
      localStorage.setItem("token", data.data.data.token);

      // Show success toast
      toast.success("Login successful!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
      setTimeout(() => {
        // Navigate to the dashboard
      navigate("/dashboard/notes");
    }, 2000);
     
    } catch (error) {
      toast.error("Login failed. Please try again.", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
    } finally {
      setFormState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Fundo-Note</h2>
        <h3>Sign in</h3>
        <p>Use your Fundo Account</p>
        <form onSubmit={handleSubmit}>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <FormControl variant="standard" fullWidth>
              <InputLabel htmlFor="email-input">Email*</InputLabel>
              <Input
                id="email-input"
                name="email"
                value={formState.email}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
                error={!!formState.errors.email}
              />
              {formState.errors.email && <span className="error-text">{formState.errors.email}</span>}
            </FormControl>

            <TextField
              id="password-input"
              name="password"
              label="Password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              variant="standard"
              error={!!formState.errors.password}
              helperText={formState.errors.password}
              fullWidth
            />

            <div className="link-row">
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
              <Link to="/Registration" className="sign-in-link">
                Create account
              </Link>
            </div>

            <Button
              variant="contained"
              type="submit"
              disabled={formState.loading}
              fullWidth
              className="login-btn"
            >
              {formState.loading ? "Logging in..." : "Login"}
            </Button>
          </Box>
        </form>
      </div>
      <ToastContainer
            position="bottom-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="colored"
            transition={Bounce}
            />
    </div>
  );
};

export default Login;
