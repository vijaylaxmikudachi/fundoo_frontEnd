import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginApiCall ,forgotPasswordCall , resetPasswordCall} from "../../utils/Api";
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

  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

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
  const handleResetPassword = async () => {
    if (!resetToken || !validatePassword(newPassword)) {
      toast.error("Please provide a valid token and password.", {
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
      await resetPasswordCall(resetToken, { newPassword }, "user/reset-password");
      toast.success("Password reset successfully!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
      setIsResetModalOpen(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reset password. Please try again.",
        {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          transition: Bounce,
        }
      );
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
<Modal open={isResetModalOpen} onClose={() => setIsResetModalOpen(false)}>
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
    <h2 style={{ textAlign: "center" }}>Reset Password</h2>
    <p style={{ textAlign: "center" }}>Enter the reset token and your new password:</p>
    <TextField
      id="reset-token"
      label="Reset Token"
      variant="standard"
      fullWidth
      value={resetToken}
      onChange={(e) => setResetToken(e.target.value)}
      sx={{ mb: 2 }}
    />
    <TextField
      id="new-password"
      label="New Password"
      type="password"
      variant="standard"
      fullWidth
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      sx={{ mb: 2 }}
    />
    <Button
      variant="contained"
      onClick={handleResetPassword}
      fullWidth
      className="submit-btn"
    >
      Reset Password
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