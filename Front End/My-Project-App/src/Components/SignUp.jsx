import React, { useState } from "react";
import { Button, Container, Col } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const url =
            "https://inventory-billing-application.onrender.com/api/register";
          const res = await axios.post(url, {
            userEmail: email,
            password: password,
          });
          navigate("/login");
          console.log(res.message);
        } catch (error) {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            setErr(error.response.data.message);
          }
        }
    };
    
    
  return (
    <Container>
    <div className="title">SVS WEAR HOUSE -PVT LIMITED</div>
    <div className="login-layout">
      <Col sm={6}>
        <div className="Login-form">
          <h3> Create user for Inventory billing Application </h3>
          <form>
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
            />

            <label htmlFor="password">Password</label>

            <input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
            />
            {err && <div className="error_msg">{err}</div>}
            <Button
              variant="primary"
              className="login"
              type="submit"
              onClick={handleSubmit}
            >
              Register
            </Button>
            <div>
              <Link className="register" to="/login">
                Already Registered ? Click here to Login
              </Link>
            </div>
          </form>
        </div>
      </Col>
    </div>
  </Container>
  )
}

export default SignUp