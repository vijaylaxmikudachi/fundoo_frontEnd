import React,{useState} from "react";
import { Link } from "react-router-dom";
import "./style.css";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Registration = () => {
  return (
 
    <div className = "container">
      <div className = "form-section">
        <h2>Fundo</h2>
        <p>Create your Fundo Account</p>
        <form>
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '38ch' } }}
            noValidate
            autoComplete="off"
          >
          <div className="form-group">
          <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="First Name"
        />
          </div>
          <div className="form-group">
          <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Last Name"
        />
          </div>
          <div className="form-group">
          <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="email-id"
          />
          <div>
          <span className="password-hint">
              Use valid email-id.
          </span>
          </div>
        
          </div>
          </Box>
            <div className="password-row">
              <div className="form-group">
              <TextField
                  id="filled-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="filled"
                />
              </div>
            <div className="form-group">
            <TextField
              id="filled-password-input"
              label="Confirm"
              type="password"
              autoComplete="current-password"
              variant="filled"
            />
            </div>
            </div>
            <span className="password-hint">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </span>
            <div className="action-row">
            <Link to="/login" className="sign-in-link">
              Sign in instead
            </Link>
              <Stack direction="row" spacing={2}>
              <Button variant="contained">Register</Button>
              </Stack>
            </div>
            
        </form>
      </div>
      <div className="image-section">
        <img src="images/register.jpg" alt="Account Icon" />
        <p>One account. All of Fundo working for you.</p>
      </div>
    </div>
  );
};

export default Registration;