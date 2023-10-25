import React from "react";

import { AiFillDashboard } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { AiOutlineStock } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <AiFillDashboard />,
    link: "/dashboard",
  },
  {
    title: "Bill",
    icon: <FaRupeeSign />,
    link: "/bill",
  },
  {
    title: "View Order",
    icon: <GrFormView />,
    link: "/vieworder",
  },
  {
    title: "View Stock",
    icon: <AiOutlineStock />,
    link: "/viewstock",
  },
  {
    title: "Add Stock",
    icon: <GrAddCircle />,
    link: "/addstock",
  },
];