import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginApiCall ,forgotPasswordCall } from "../../utils/Api";
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
import Modal from "@mui/material/Modal";

const Login = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    errors: { email: "", password: "" },
    loading: false,
  });
  
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 8;
  const handleForgotPassword = async () => {
    if (!validateEmail(forgotPasswordEmail)) {
      toast.error("Please enter a valid email address.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
      return;
    }

    try {
      await forgotPasswordCall({ email: forgotPasswordEmail }, "user/forget-password");
      toast.success("Reset link sent to your email.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to send reset link. Please try again.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
    }
  };
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
              <a
                href="#"
                className="forgot-password"
                onClick={() => setIsModalOpen(true)}
              >
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
      {/* Modal for Forgot Password */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
      borderRadius: "8px",
    }}
  >
    <h2 style={{ textAlign: "center" }}>Forgot Password</h2>
    <p style={{ textAlign: "center" }}>Enter your email to receive the reset link:</p>
    <TextField
      id="forgot-password-email"
      label="Email"
      variant="standard"
      fullWidth
      value={forgotPasswordEmail}
      onChange={(e) => setForgotPasswordEmail(e.target.value)}
      sx={{ mb: 2 }}
    />
    <Button
      variant="contained"
      onClick={handleForgotPassword}
      fullWidth
      className="submit-btn"
    >
      Send Reset Link
    </Button>
  </Box>
</Modal>

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
