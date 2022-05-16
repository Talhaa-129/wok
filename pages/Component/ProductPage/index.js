import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styless from "../../../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";

function Product() {
  const params = useRouter();
  const dispatch = useDispatch();

  const totalData = useSelector((state) => state.global.maindata);
  const product = useSelector((state) => state.global.productId);

  const dataa = params.query.data;

  useEffect(() => {
    const data = totalData.filter((values) => {
      if (dataa == values.id) {
        return { ...values };
      }
    });
    dispatch({ type: "PRODUCT_BYID", payload: data });
  }, [dispatch]);

  return (
    <div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#29272b",
          display: "flex",
          flexDirection: "row",
          textAlign: "center",
          position: "fixed",
          zIndex: 1,
          boxShadow: "0px 2px 6px #29272b",
        }}
      >
        <div
          style={{
            // height: "100px",
            flex: "40%",
            padding: 20,
          }}
        >
          <div style={{ position: "absolute", left: 60 }}>
            <Image
              src={"/eco.png"}
              layout="intrinsic"
              height={40}
              width={200}
            />
          </div>
        </div>
        <div
          className={styless.home}
          onClick={() => {
            params.push("/");
          }}
        >
          <h4 className={styless.menuHome}> Home</h4>
        </div>
        <div
          style={{
            flex: "1%",
            padding: 20,
          }}
        >
          <h4 className={styless.menuHome}> Contact</h4>
        </div>
        <div style={{ flex: "2%", padding: 20 }}>
          <h4 className={styless.menuHome}> E-mail</h4>
        </div>
        <div style={{ flex: "1%", padding: 20 }}>
          <h4 className={styless.menuHome}> Detail</h4>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          paddingTop: 100,
          flexDirection: "row",
        }}
      >
        <div style={{ padding: 20, flex: "50%" }}>
          <Image
            id="imgg"
            src={`/${product[0]?.picturecart}`}
            layout="responsive"
            height={100}
            width={100}
          />
        </div>
        <div style={{ flex: "50%", padding: 25 }}>
          <div
            style={{
              padding: 30,
              backgroundColor: "lightgray",
              borderRadius: 20,
            }}
          >
            <h2>
              <strong>{product[0]?.name}</strong>
            </h2>
            <h2>Rs {product[0]?.price}</h2>
            <h4>Quantity : {product[0]?.quantity}</h4>

            <h4>
              <b>Location:</b> {product[0]?.location}
            </h4>
            <div style={{ paddingTop: 20 }}>
              <hr style={{ opacity: 0.5 }} />
            </div>
            <div style={{ paddingTop: 10 }}>
              <h4 style={{ fontWeight: "bold" }}>PRODUCT DETAILS</h4>
              <p>
                The rich peach color matching separate paired with shaffun
                dopatta and making a statement of this end summer season. The
                classic egyption style cut of shirt is embellished with ivorny
                pearls and crystal stones and sequence the garment is further
                paired with an silk paint
              </p>
            </div>
            <div style={{ paddingTop: 5 }}>
              <hr style={{ opacity: 0.5 }} />
            </div>
          </div>
        </div>
      </div>
      <div>ssssssssssssss</div>
    </div>
  );
}
export default Product;
