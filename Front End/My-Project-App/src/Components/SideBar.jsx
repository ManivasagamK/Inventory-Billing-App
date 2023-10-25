
import React from "react";
import { SidebarData } from "./SidebarData";

import "./styles.css";
function Menu() {
  return (
    <div className="sidebar">
      <ul className="sidebarList">
        <div className="title">Mk Pvt Lmt</div>

        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              id={window.pathname === val.link ? "active" : ""}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div id="icon">{val.icon}</div> <div id="title">{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Menu;
