import React from "react";
import "antd/dist/antd.css";
import { Button, Input, Image } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

function Carts() {
  const dispatch = useDispatch();

  const totalCartData = useSelector((state) => state.global.addedCart);

  return (
    <div>
      <div>
        {totalCartData.map((values, index) => {
          return (
            <div
              key={index}
              style={{
                height: 85,
                backgroundColor: "#ECECEC",
                marginBottom: 10,
                display: "flex",
                border: "1px solid lightgray",
                borderRadius: 10,
              }}
            >
              <div style={{ width: 100 }}>
                <Image
                  src={`/${values.picturecart}`}
                  layout="responsive"
                  width={80}
                  height={83}
                  style={{ borderRadius: 10 }}
                />
              </div>
              <div style={{ width: 100, margin: 6 }}>
                <h3>{values.name}</h3>
                <h4>Rs {values.price}</h4>
              </div>
              <div
                style={{
                  width: 20,
                  paddingTop: 20,
                }}
              >
                <Button
                  type="link"
                  style={{
                    fontSize: "25px",
                    paddingLeft: 0,
                  }}
                  onClick={() => {
                    dispatch({
                      type: "DECREMENT",
                      payload: {
                        cartData: { totalCartData },
                        ID: { id: values.id },
                      },
                    });
                  }}
                >
                  -
                </Button>
              </div>
              <div
                style={{
                  width: 56,
                  paddingTop: 27,
                }}
              >
                <Input placeholder={values.quantity} />
              </div>
              <div style={{ width: 30, paddingTop: 26 }}>
                <Button
                  type="link"
                  style={{ fontSize: "20px" }}
                  onClick={() => {
                    dispatch({
                      type: "INCREMENT",
                      payload: {
                        cartData: { totalCartData },
                        ID: { id: values.id },
                      },
                    });
                  }}
                >
                  +
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: 15,
                  paddingTop: 30,
                }}
              >
                <div>
                  <Button type="link" style={{ fontSize: "12px" }}>
                    Purchase
                  </Button>
                </div>
                <div>
                  <Button
                    type="link"
                    icon={<DeleteOutlined style={{ color: "red" }} />}
                    style={{ fontSize: "12px" }}
                    onClick={() => {
                      dispatch({
                        type: "DELETE_CART",
                        payload: { id: values.id },
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Carts;
