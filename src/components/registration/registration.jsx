import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Registration.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { signupApiCall } from "../../utils/Api";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formValues.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email))
      newErrors.email = "Please enter a valid email.";
    if (formValues.password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    if (formValues.password !== formValues.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
        
        const { firstName, lastName, email, password } = formValues;

        signupApiCall({firstName,lastName,email,password},`user`)
        .then((result)=>{
          const {data}=result
            if(data.message=== "User registered successfully"){
              toast.success("User Successfully Created!!", {
                position: "bottom-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
              })
              setTimeout(() => {
                navigate("/login")
            }, 3000);
            }
            else{
              alert("User Not Created !")
            }
        })
        .catch((error)=>{
          console.log(error)
          alert("User Not Created due to backend Error!")
          toast.error("User Not Created!", {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          })
         })
        
       }
       
      
      
    }


  return (
    <div className ="reg-body">    <div className="reg-container">
      <div className="form-section">
        <div className="register-image-row">
          <img src="images/Fundo-img.png" alt="Logo" className="register-header-logo" />
          <div className="register-header-title">
            <div className="register-form-title">Fundo-Note</div>
            <div className="register-form-subtitle">Create your Fundoo Account</div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <TextField
              label="First Name"
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </div>
          <div className="form-group">
            <TextField
              label="Last Name"
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </div>
          <div className="form-group">
            <TextField
              label="Email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
            />
          </div>
          <div className="password-row">
            <div className="form-group">
              <TextField
                label="Password"
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                fullWidth
                error={!!errors.password}
                helperText={errors.password}
              />
            </div>
            <div className="form-group">
              <TextField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
                fullWidth
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </div>
          </div>
          <div className="action-row">
            <Link to="/login" className="sign-in-link">Sign in instead</Link>
            <Button variant="contained" type="submit" className="register-btn">
              Register
            </Button>
          </div>
        </form>
      </div>
      <div className="image-section">
        <img src="images/register.jpg" alt="Account Icon" />
        <p>One account. All of Fundoo working for you.</p>
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
    </div>

  );
};

export default Registration;
