
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

var global = [];

function Bill() {
  const [displays, setDisplays] = useState({ display: "none" });
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [count, setCount] = useState(1);
  const [orderId, setOrderId] = useState("");
  const [submit, setSubmit] = useState({ display: "none" });
  // const navigate = useNavigate();
  const getUrl =
    "https://inventory-billing-application.onrender.com/api/getstock";
  const createorderUrl =
    "https://inventory-billing-application.onrender.com/api/createorder";
  const updateorderUrl =
    "https://inventory-billing-application.onrender.com/api/updateorderid";
  const getorderUrl =
    "https://inventory-billing-application.onrender.com/api/getodid";

  useEffect(() => {
    Axios.get(getorderUrl)
      .then((res) => {
        setOrderId(`ODNOSVSWH-${res.data[0].orderId}`);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleSubmit = () => {
    global.forEach(async (order) => {
      console.log(order);
      await Axios.post(createorderUrl, {
        orderId: orderId,
        itemName: order.itemName,
        itemCode: order.itemCode,
        qty: order.qty,
        itemPrice: order.totalPrice / order.qty,
        totalPrice: totalAmount,
      })
        .then((res) => {
          console.log(res);
        })
        .then((err) => {
          console.log(err);
        });
    });
    Axios.put(updateorderUrl, { orderId: orderId });
    // navigate("/vieworder");

    alert("Order invoice Ready please visit View Order page!!!");
  };

  function handleGetItem() {
    Axios.get(getUrl).then((res) => {
      let temp = res.data;

      const item = temp.filter((prod) => {
        return prod.itemCode === itemCode;
      });
      setName(item[0].itemName);
      setBrand(item[0].brand);
      setCategory(item[0].category);
      setSize(item[0].size);
      setPrice(item[0].price);
      setTotalPrice(item[0].price);
      setTotalAmount(item[0].price);
      setDisplays({ display: "flex" });
      setSubmit({ display: "none" });
    });
  }

  function handleAdditem() {
    let obj = {};
    obj.itemName = name;
    obj.itemCode = itemCode;
    obj.qty = count;
    obj.totalPrice = totalPrice;
    obj.totalAmount = totalAmount;

    global.push(obj);
    console.log(global);

    let total = 0;
    global.forEach((item) => {
      total += item.totalPrice;
      setTotalAmount(total);
    });
    setBrand("");
    setCategory("");
    setSize("");
    setPrice("");
    setName("");
    setCount(1);
    setTotalPrice(1);
    setDisplays({ display: "none" });
    setSubmit({ display: "flex" });
  }

  return (
    <Container fluid id="body">
      <div className="title">SVS WEAR HOUSE -PVT LIMITED</div>

      <div className="inputcontainer">
        <div>
          <label for="itemCode">Item code</label>
          <input
            placeholder="EnterItemCode"
            type="text"
            id="itemCode"
            onChange={(e) => {
              e.preventDefault();
              setItemCode(e.target.value);
            }}
          />

          <Button
            variant="success"
            onClick={() => {
              handleGetItem();
            }}
          >
            Get item
          </Button>
        </div>

        <div>
          <label for="itemName">Item name</label>
          <input type="text" id="itemName" value={name} />
        </div>
        <div>
          <label for="brand">Brand</label>
          <input type="text" id="brand" value={brand} />
        </div>
        <div>
          <label for="category">Category</label>
          <input type="text" id="category" value={category} />
        </div>
        <div>
          <label for="size">Size</label>
          <input type="text" id="size" value={size} />
        </div>
        <div>
          <label for="qty">Qty</label>
          <input
            type="text"
            id="qty"
            value={count}
            style={{ textAlign: "center" }}
          />
          <div
            style={{
              display: "flex",
            }}
          >
            <Button
              className="counter"
              onClick={() => {
                setCount(count + 1);
                setTotalPrice((count + 1) * price);
                setTotalAmount((count + 1) * price);
              }}
              variant="success"
              style={displays}
            >
              +
            </Button>{" "}
            &nbsp;
            <Button
              onClick={() => {
                if (count > 1) {
                  setCount(count - 1);
                  setTotalPrice((count - 1) * price);
                  setTotalAmount((count - 1) * price);
                }
              }}
              className="counter"
              variant="danger"
              style={displays}
            >
              -
            </Button>
          </div>
        </div>

        <div>
          <label for="price">Price</label>
          <input type="text" id="price" value={price} />
        </div>
        <div>
          <label for="totalprice">Total</label>
          <input type="text" id="totalprice" value={totalPrice} />
        </div>
      </div>
      <div className="addbutton" style={displays}>
        <Button
          variant="primary"
          onClick={() => {
            handleAdditem();
          }}
        >
          Add Item
        </Button>
      </div>

      <h3 className="addbutton">List of selected products</h3>
      <div id="data">
        <div>
          <Table striped>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            {global.map((item, i) => {
              return (
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{item.itemCode}</td>
                    <td>{item.itemName}</td>
                    <td>{item.qty}</td>
                    <td>{item.totalPrice}</td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </div>
        <div className="addbutton">
          <div className="totalamount ">
            <label
              for="totalAmont"
              style={{ fontSize: "14px", color: "black" }}
            >
              Total Bill Amount
            </label>
            <input
              type="text"
              id="totalAmont"
              value={totalAmount}
              disabled
            ></input>
          </div>
        </div>
        <br />
      </div>
      <div className="submitbill">
        <Button
          style={submit}
          variant="success"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </Button>
      </div>
    </Container>
  );
}

export default Bill;
