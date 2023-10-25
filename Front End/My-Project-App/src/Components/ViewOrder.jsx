
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Container } from "react-bootstrap";
import easyinvoice from "easyinvoice";

function ViewOrder() {
  const [itemlist, setItemlist] = useState([]);

  const getItemlist =
    "https://inventory-billing-application.onrender.com/api/getordereditems";

  async function getorder() {
    Axios.post(getItemlist).then((items) => {
      setItemlist([...items.data]);
    });
  }
  const invoiceurl =
    "https://inventory-billing-application.onrender.com/api/invoice/";
  useEffect(() => {
    getorder();
  }, []);

  async function downloadPdf(item) {
    console.log(item.orderId);

    Axios.get(invoiceurl + item.orderId)
      .then((res) => {
        console.log(res.data);
        easyinvoice.createInvoice(res.data, function (result) {
          easyinvoice.download("myInvoice.pdf", result.pdf);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function renderItemList(item) {
    // console.log(item);
    const resArr = [];
    if (item) {
      const tempArr = item.filteredArr;
      // console.log(tempArr);
      if (tempArr && tempArr.length > 0) {
        tempArr.map((rec, i) => {
          resArr.push(
            <div key={i}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Item Code{rec.itemCode} </Card.Title>
                  <Card.Text>
                    Item Name :{rec.itemName}
                    <br />
                    Quantity:{rec.qty}
                    <br />
                    Item Price:{rec.itemPrice}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          );
        });
      }
    }
    return resArr;
  }
  return (
    <div style={{ backgroundColor: "#d6eef8" }}>
      <div className="title">Mk Pvt Lmt</div>
      <h3 className="addbutton" style={{ textDecoration: "underline" }}>
        ORDER DETAILS
      </h3>
      {itemlist &&
        itemlist.length > 0 &&
        itemlist.map((item, i) => {
          // console.log(item);
          return (
            <Container key={`key${i}`} style={{ margin: "15px" }}>
              <Accordion defaultActiveKey="SVSWH-001">
                <Accordion.Item eventKey={item.orderId}>
                  <Accordion.Header>
                    {item.orderId} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <h5>
                      Total Bill:
                      {item.filteredArr[0].totalPrice}
                    </h5>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <div>
                      <Button
                        className="buttondownload"
                        onClick={() => downloadPdf(item)}
                      >
                        Download Invoice
                      </Button>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>{renderItemList(item)}</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Container>
          );
        })}
    </div>
  );
}

export default ViewOrder;
