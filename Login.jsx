import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Button, Form } from "react-bootstrap";

function Login() {
   
    const navigate = useNavigate();
    const[formData, setFormData] = useState({
      email:'',
      password:''
    });

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    try {
    const response = await fetch("http://localhost:5000/auth/login", {
      method:"POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(formData)
    });
    const result = await response.json();
    console.log(result);

    if (response.ok) {
       localStorage.setItem("token", result.token);
      navigate("/dashboard");
    } else{
      alert(result.message || "Login failed");
      }
    } catch (error) {
       console.error(error.message);
       alert("Something went wrong. Please try again");
    }finally{
      setFormData({
        email: "",
        password:""
      });
    }
 };

  return (
     <div className='center-form'>
      <Form onSubmit={ handleSubmit }>
        <h1>Login</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={ handleInputChange }
              required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
              required
          />
        </Form.Group>

        <Button variant="dark" type="submit" className="w-100 mt-4">
           Login
        </Button>
        <Button
          variant="secondary"
          className="w-100 mt-2"
          onClick={() => navigate("/register")}
        >
          Signup
        </Button>
      </Form>
    </div>
  );
}

export default Login;