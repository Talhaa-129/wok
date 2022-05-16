import "antd/dist/antd.css";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useInjectSaga } from "redux-injectors";
import { useDispatch, useSelector } from "react-redux";
import { Button, Badge, Drawer, Carousel, Modal, Card } from "antd";
import { ShoppingCartOutlined, PlusOutlined } from "@ant-design/icons";

import Carts from "./Component/AddedCart";
import UploadingForm from "./Component/UploadForm";
import homeSaga from "../stores/saga";
import styles from "../styles/Home.module.css";

const { Meta } = Card;

function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const visible = useSelector((state) => state.global.visible);
  const formVisible = useSelector((state) => state.global.formVisible);
  const totalData = useSelector((state) => state.global.maindata);
  const totalCartData = useSelector((state) => state.global.addedCart);

  useInjectSaga({ key: "global", saga: homeSaga });

  useEffect(() => {
    dispatch({ type: "GET_ALLDATA" });
    dispatch({ type: "GET_CARTDATA" });
  }, [dispatch]);

  return (
    <div>
      <div>
        <div className={styles.menu}>
          <div className={styles.logo}>
            <div>
              <h3
                style={{
                  fontSize: "30px",
                  paddingLeft: 35,
                  fontWeight: "bolder",
                  color: "white",
                }}
              >
                Wokiee
              </h3>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                position: "absolute",
                zIndex: 1,
                top: 10,
                right: 100,
                minWidth: "40%",
              }}
            >
              <div className={styles.HomeMenu}>Home</div>
              <div className={styles.HomeMenu}>Marketing</div>
              <div className={styles.HomeMenu}>Best Sellers</div>
              <div className={styles.HomeMenu}>Contact Us</div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              top: 16,
              right: 27,
            }}
          >
            <Badge
              style={{ background: "red", boxShadow: "0 0 0 0px red" }}
              count={totalCartData.length}
            >
              <Button
                style={{ borderRadius: 100 }}
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={() => {
                  dispatch({
                    type: "VISIBLE",
                    payload: { modalVisible: true },
                  });
                }}
              />
            </Badge>
            <Drawer
              width={450}
              title="Cart"
              visible={visible}
              onClose={() => {
                dispatch({ type: "VISIBLE", payload: { modalVisible: false } });
              }}
            >
              <Carts />
            </Drawer>
          </div>
        </div>
        <div>
          <Carousel autoplay>
            <div>
              <Image
                alt="sorry"
                src="/demox.png"
                layout="responsive"
                width={100}
                height={40}
              />
            </div>
            <div>
              <Image
                alt="sorry"
                src="/demo14.jpg"
                layout="responsive"
                width={100}
                height={40}
              />
            </div>
            <div>
              <Image
                alt="sorry"
                src="/demo17.jpg"
                layout="responsive"
                width={100}
                height={40}
              />
            </div>
          </Carousel>
        </div>
        <div
          style={{
            float: "right",
            position: "relative",
            bottom: 50,
            right: 27,
          }}
        >
          <Button
            style={{ borderRadius: 100 }}
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              dispatch({
                type: "FORM_VISIBLE",
                payload: { FormVisible: true },
              });
            }}
          >
            Upload CART
          </Button>
        </div>
      </div>
      <div>
        <h1
          style={{
            marginTop: 30,
            textAlign: "center",
            padding: 10,
          }}
        >
          Products For Sell
        </h1>
        <div className={styles.Cart}>
          {totalData?.map((values, index) => {
            return (
              <Card
                key={index}
                hoverable
                style={{
                  width: 240,
                  borderRadius: 10,
                  marginTop: 10,
                  marginRight: 10,
                }}
                cover={
                  <Image
                    alt="soory"
                    id="homeImg"
                    src={`/${values.picturecart}`}
                    height={200}
                    width={300}
                    style={{ borderRadius: 10 }}
                    onClick={() => {
                      // const maindata = values;
                      const maindata = values.id;
                      return router.push({
                        pathname: "/Component/ProductPage",
                        query: { data: maindata },
                      });
                    }}
                  />
                }
              >
                <Meta
                  title={`${values.name}`}
                  description={`${values.price} Rs`}
                />
                <Meta
                  style={{ float: "right", position: "relative", bottom: 16 }}
                  description={`${values.location}`}
                />
                <div style={{ position: "relative", top: 10 }}>
                  <Button
                    className={styles.cartButton}
                    type="link"
                    onClick={() => {
                      dispatch({
                        type: "POST_TO_CART",
                        payload: { id: values.id },
                      });
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <div>
        <Modal
          visible={formVisible}
          footer={false}
          onCancel={() => {
            dispatch({ type: "FORM_VISIBLE", payload: { FormVisible: false } });
          }}
        >
          <h1 style={{ textAlign: "center" }}>Add Cart</h1>
          <UploadingForm />
        </Modal>
      </div>
    </div>
  );
}
export default Home;
