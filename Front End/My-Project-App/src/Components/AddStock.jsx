import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AddStock() {
  const navigate = useNavigate();
  const [itemCode, setItemCode] = useState("");

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");

  const url =
    "https://inventory-billing-application.onrender.com/api/addstock/";
  const updateUrl =
    "https://inventory-billing-application.onrender.com/api/updatecode";
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(name, brand, category, size, price);
    await Axios.post(url, {
      itemCode: itemCode,
      itemName: name,
      brand: brand,
      category: category,
      size: size,
      price: price,
    })
      .then((res) => {
        if (res.data === "Stock Added Sucessfully!!!") {
          Axios.put(updateUrl, { itemCode: itemCode });
          navigate("/viewstock");
        } else {
          alert(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    Axios.get("https://inventory-billing-application.onrender.com/api/getcode/")
      .then((res) => {
        setItemCode(`SVSWH-${res.data[0].itemCode}`);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Container>
      <div className="title">Mk Pvt Lmt</div>
      <form id="form-value">
        <div className="addcontainer">
          <h3 style={{ marginBottom: "40px" }}>Fill all the Fields</h3>
          <div className="row ">
            <div className="input-field col s6">
              <label className="active" htmlFor="itemId">
                Item Id
              </label>
              <input id="itemId" type="text" value={itemCode} disabled />
            </div>
            <div className="input-field col s6">
              <input
                id="itemName"
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                required
              />
              <label htmlFor="itemName">Item Name</label>
            </div>
            <div className="input-field col s6">
              <input
                id="category"
                name="category"
                required
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  setCategory(e.target.value);
                }}
              />
              <label htmlFor="category">Category</label>
            </div>
            <div className="input-field col s6">
              <input
                id="brand"
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  setBrand(e.target.value);
                }}
                required
              />
              <label htmlFor="brand">Brand</label>
            </div>
            <div className="input-field col s6">
              <input
                id="size"
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  setSize(e.target.value);
                }}
                required
              />
              <label htmlFor="size">Size</label>
            </div>
            <div className="input-field col s6">
              <input
                id="price"
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  setPrice(e.target.value);
                }}
                required
              />
              <label htmlFor="price">Price</label>
            </div>
          </div>
          <Button type="submit" variant="warning" onClick={handleSubmit}>
            Add to Stock
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default AddStock;
