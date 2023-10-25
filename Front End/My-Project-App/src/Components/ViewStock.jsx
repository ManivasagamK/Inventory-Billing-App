
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import Axios from "axios";
function ViewStock() {
  const [products, setProducts] = useState([]);
  const getUrl =
    "https://inventory-billing-application.onrender.com/api/getstock";
  const deleteUrl =
    "https://inventory-billing-application.onrender.com/api/deletestock/";

  function getApi() {
    Axios.get(getUrl).then((res) => {
      setProducts(res.data);
    });
  }

  async function handleDelete(id) {
    alert("Confirmation leads to deletion of product");
    await Axios.delete(deleteUrl + id);
    getApi();
  }
  useEffect(() => {
    getApi();
  }, []);
  return (
    <Container>
      <div className="viewstock">
        <div className="title">SVS INVENTORY LIST</div>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Item id</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Size</th>
              <th>Price (Rupees)</th>
              <th>Entry date &time</th>
              <th>Actions</th>
            </tr>
          </thead>
          {products.map((product, i) => {
            var date = product.date;

            return (
              <tbody key={i}>
                <tr>
                  <td>{i + 1}</td>
                  <td>{product.itemCode}</td>
                  <td>{product.itemName}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>{product.size}</td>
                  <td>{`${product.price}`}</td>
                  <td>{date}</td>
                  <td>
                    <Button
                      onClick={() => {
                        handleDelete(product._id);
                      }}
                      variant="outline-danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>
    </Container>
  );
}

export default ViewStock;
