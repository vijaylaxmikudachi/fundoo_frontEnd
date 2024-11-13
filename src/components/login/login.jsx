import React from "react";
import "./login.css";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Fundo</h2>
        <h3>Sign in</h3>
        <p>Use your Fundo Account</p>
        <form>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
              <div>
                <FormControl variant="standard">
                  <InputLabel htmlFor="input-with-icon-adornment">
                    Email or phone*
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
          <div>
          <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
        />
          </div>
            <div className="link-row">
              <a href="#" className="forgot-password">
                Forgot password
              </a>
              <a href="#" className="create-account">
                Create account
              </a>
            </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </Box>
        </form>
      </div>
    </div>
  );
};

export default Login;
