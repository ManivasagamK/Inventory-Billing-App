import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiOutlinePoweroff } from "react-icons/ai";
function Home() {
  const [display, setDisplay] = useState({ display: "block" });
  const Navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/login");
    setDisplay({ display: "none" });
  };
  return (
    <div>
      <nav className="navbar">
        <img
          src="https://t4.ftcdn.net/jpg/03/50/73/13/240_F_350731301_SljOrT1KCi0KCp7e2OwLM5vpBumWBOWU.jpg"
          alt="company logo"
          style={{
            alignItems: "left",
            height: "50px",
            width: "100px",
            borderRadius: "30px",
            marginLeft: "10px",
          }}
        />

        <Button
          className="logoutButton"
          variant="warning"
          onClick={handleLogout}
          style={display}
        >
          <AiOutlinePoweroff /> Logout
        </Button>
      </nav>
    </div>
  );
}

export default Home;