import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  formVisible: false,
  maindata: [],
  addedCart: [],
  productId: [],
};

const global = createSlice({
  name: "global",
  initialState,
  reducers: {
    drawer: (state, action) => {
      state.visible = action.payload.modalVisible;
    },
    formVisi: (state, action) => {
      state.formVisible = action.payload.FormVisible;
    },
    Alldata: (state, action) => {
      state.maindata = action.payload;
    },
    AddedCart: (state, action) => {
      const carts = action.payload.map((values) => {
        const namee = values.name.trim();
        const data = {
          id: values.id,
          name: namee,
          price: values.price,
          location: values.location,
          quantity: values.quantity,
          picturecart: values.picturecart,
        };
        return data;
      });
      state.addedCart = carts;
    },
    Increment: (state, action) => {
      const id = action.payload.ID?.id;
      const data = action.payload.cartData?.totalCartData.map((values) => {
        if (id == values.id) {
          if (values.quantity == 7) {
            return { ...values };
          } else {
            return { ...values, quantity: values.quantity + 1 };
          }
        }
        return values;
      });
      state.addedCart = data;
    },
    Decrement: (state, action) => {
      const id = action.payload.ID?.id;
      const data = action.payload.cartData?.totalCartData.map((values) => {
        if (id == values.id) {
          if (values.quantity == 1) {
            return { ...values };
          } else {
            return { ...values, quantity: values.quantity - 1 };
          }
        }
        return values;
      });
      state.addedCart = data;
    },
    ProductbyId: (state, action) => {
      state.productId = action.payload;
    },
  },
});
export const {
  drawer,
  formVisi,
  Alldata,
  AddedCart,
  Increment,
  Decrement,
  ProductbyId,
} = global.actions;
export default global.reducer;
