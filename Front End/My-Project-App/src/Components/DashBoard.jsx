
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Container } from "react-bootstrap";
import { FaRupeeSign, FaMoneyBill } from "react-icons/fa";
import { GiGunStock } from "react-icons/gi";
function DashBoard() {
  const [sales, setSales] = useState("");
  const [stocks, setStocks] = useState("");
  const [order, setOrder] = useState("");
  const [totalSales, setTotalSales] = useState("");
  const [brand, setBrand] = useState([]);

  const getUrl =
    "https://inventory-billing-application.onrender.com/api/getstock";
  const getUrlid =
    "https://inventory-billing-application.onrender.com/api/getodid";
  const getorders =
    "https://inventory-billing-application.onrender.com/api/getorder";

  function getOrder() {
    Axios.get(getorders).then((res) => {
      let resData = res.data;

      let total = 0;
      resData.forEach((item) => {
        total += item.itemPrice * item.qty;
        setTotalSales(total);
      });
    });
  }

  function getid() {
    Axios.get(getUrlid)
      .then((res) => {
        setOrder(Number(res.data[0].orderId) - 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getApi() {
    Axios.get(getUrl).then((res) => {
      let arr = res.data;
      setBrand(arr);
      let totalSales = 0;
      let totalStocks = arr.length;
      setStocks(totalStocks);
      arr.forEach((item) => {
        totalSales += item.price;

        setSales(totalSales);
      });
    });
  }
  useEffect(() => {
    getApi();
    getid();
    getOrder();
  }, []);
  return (
    <Container style={{ background: "#d6eef8" }}>
      <div className="title">Mk Pvt Lmt</div>
      <div className="imgdiv ">
        <img
          width={350}
          height={250}
          src="https://www.syncfusion.com/blogs/wp-content/uploads/2018/08/stock_markets_60999aa9.png"
          alt="Stock Analysis img!!"
        ></img>
      </div>
      <div className="dashtab">
        <div className="sales">
          <FaRupeeSign />
          {totalSales}
          <div> Total sales</div>
        </div>

        <div className="orders">
          <FaMoneyBill />
          {order}
          <div> Total Orders</div>
        </div>
        <div className="stocks">
          <GiGunStock />
          {stocks}
          <div>Total stocks</div>
        </div>
        <div className="totalvalue">
          {" "}
          <FaRupeeSign />
          {sales}
          <div>Total Value</div>
        </div>
        <div style={{ width: "100vw", height: "100px" }}>
          <div className="title">Available Brands</div>
        </div>
        <div className="brandcontainer">
          {brand.map((rec) => {
            return (
              <div>
                <div className="brand">{rec.brand}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default DashBoard;
