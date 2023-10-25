
import React, { useState } from "react";
import { Button, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        "https://inventory-billing-application.onrender.com/api/login";

      const res = await axios.post(url, {
        userEmail: email,
        password: password,
      });
      console.log(res);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setErr(error.response.data.message);
      }
      console.log(error);
    }
  };
  return (
    <Container>
      {" "}
      <div className="title">MK Pvt Lmt</div>
      <div className="login-layout">
        <Col sm={6}>
          <div className="Login-form">
            <h3> Login for Inventory billing Application </h3>
            <form>
              <label
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
              />
              <label
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                id="password"
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
                Login
              </Button>
              <div>
                <Link className="register" to="/register">
                  New user Register?
                </Link>
              </div>
            </form>
          </div>
        </Col>
      </div>
    </Container>
  );
}

export default LoginPage;
