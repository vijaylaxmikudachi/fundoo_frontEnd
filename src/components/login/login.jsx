import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginApiCall } from "../../utils/Api";
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
  const [email, setEmail] = useState("");//use n
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let emailError = "";
    let passwordError = "";

    if (!validateEmail(email)) {
      emailError = "Enter valid email address.";
    }
    if (!validatePassword(password)) {
      passwordError = "Enter Valid Password.";
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setErrors({ email: "", password: "" });
    setLoading(true);

    try {
      const data = await loginApiCall({email, password},`user/login`);
      console.log(data);
      localStorage.setItem('token', data.data.data.token);
      navigate("/dashboard/notes");
    } catch (error) {
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
                error={!!errors.email}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </FormControl>

            <TextField
              id="password-input"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="standard"
              error={!!errors.password}
              helperText={errors.password}
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
              disabled={loading}
              fullWidth
              className="login-btn"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Login;
