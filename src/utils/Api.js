import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

//Login
export const login = async (email, password) => {
  try {
    const response = await API.post("/user/login", { email, password });
    return response.data; // the token 
  } catch (error) {
    throw error.response?.data?.message || "Login failed. Please try again.";
  }
};
// Registration
export const register = async (userData) => {
    try {
      const response = await API.post("/user", userData);
      return response.data; // Return success message or token
    } catch (error) {
      throw error.response?.data?.message || "Registration failed. Please try again.";
    }
  };

// Fetch all notes
export const getNotes = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found in localStorage");
      throw new Error("Token missing from localStorage");
    }

    const response = await API.get("/note/", {
      headers: {
        "Authorization": `Bearer ${token}`, // Send token in the Authorization header
      },
      
    });
    console.log("Token in localStorage:", localStorage.getItem("token"));

    console.log("Fetched Notes:", response.data); // Log fetched notes
    return response.data; // Return fetched notes
  } catch (error) {
    console.error("Error fetching notes:", error.response || error.message);
    throw error.response?.data?.message || error.message || "Error fetching notes";
  }
};

