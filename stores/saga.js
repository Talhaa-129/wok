import axios from "axios";
import { message } from "antd";
import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "./reducer";

function* drawerVisible({ payload: modalVisible }) {
  yield put(actions.drawer(modalVisible));
}

function* formVisible({ payload: FormVisible }) {
  yield put(actions.formVisi(FormVisible));
}
function* formUpload({ payload }) {
  const { name, price, location, quantity } = payload;
  const main = { name, price, location, quantity };
  const filee = payload.upload.file.originFileObj;
  const data = new FormData();
  data.append("file", filee);
  data.append("formValues", JSON.stringify(main));

  const head = {
    "Content-Type": "multipart/form-data",
  };
  try {
    yield call(axios.post, "/uploadForm", data, { headers: head });
    yield put({ type: "FORM_VISIBLE", payload: { FormVisible: false } });
  } catch (e) {
    console.log(e, "formError");
  }
  // axios
  //   .post("/uploadForm", data, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   })
  //   .then((res) => {
  //     if (res) {
  //       console.log("Upload");
  //     }
  //   });
}
function* getData() {
  try {
    const { data } = yield call(axios.get, "/getTotaldata");
    yield put(actions.Alldata(data));
  } catch (e) {
    console.log(e);
  }
}
function* postToCart({ payload: id }) {
  const data = { idd: id };
  try {
    yield call(axios.post, "/posttocart", data);
    message.success("Add Successfully");
    yield put({ type: "GET_CARTDATA" });
  } catch (e) {
    console.log(e);
  }
}
function* fetchCart() {
  try {
    const { data } = yield call(axios.get, "/getocart");
    yield put(actions.AddedCart(data));
  } catch (e) {
    console.log(e);
  }
}
function* deleteCart({ payload }) {
  try {
    const idd = payload.id;
    const data = { ID: idd };
    yield call(axios.delete, "/deleteCart", { data });
    message.success("Deleted Successfully");
    yield put({ type: "GET_CARTDATA" });
  } catch (e) {
    console.log(e);
  }
}
function* increment({ payload: { cartData, ID } }) {
  const data = { cartData, ID };
  yield put(actions.Increment(data));
}
function* Decrement({ payload: { cartData, ID } }) {
  const data = { cartData, ID };
  yield put(actions.Decrement(data));
}
function* productById({ payload }) {
  yield put(actions.ProductbyId(payload));
}

function* homeSaga() {
  yield takeLatest("VISIBLE", drawerVisible);
  yield takeLatest("FORM_VISIBLE", formVisible);
  yield takeLatest("UPLOAD_FORM", formUpload);
  yield takeLatest("GET_ALLDATA", getData);
  yield takeLatest("POST_TO_CART", postToCart);
  yield takeLatest("GET_CARTDATA", fetchCart);
  yield takeLatest("DELETE_CART", deleteCart);
  yield takeLatest("INCREMENT", increment);
  yield takeLatest("DECREMENT", Decrement);
  yield takeLatest("PRODUCT_BYID", productById);
}
export default homeSaga;
