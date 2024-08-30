


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// Initial state
const initialState = {
  productList: [],
  cartItem: [],
};

// Define async thunks
export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/product/${productId}`, {  // Ensure the URL is correct
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      const responseData = await response.json();
      return responseData.data; // Return the deleted product data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const toggleProductStatus = createAsyncThunk(
  'product/toggleProductStatus',
  async ({ productId, isActive }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/products/${productId}/status`, {  // Updated URL
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive })
      });

      if (!response.ok) {
        throw new Error('Failed to update product status');
      }

      return { productId, isActive };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create slice
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },
    addCartItem: (state, action) => {
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      if (check) {
        toast("Item already in cart");
      } else {
        toast("Item added successfully");
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
      }
    },
    deleteCartItem: (state, action) => {
      toast("One item deleted");
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      state.cartItem.splice(index, 1);
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      if (index >= 0) {
        let qty = state.cartItem[index].qty;
        const qtyInc = ++qty;
        state.cartItem[index].qty = qtyInc;

        const price = state.cartItem[index].price;
        const total = price * qtyInc;

        state.cartItem[index].total = total;
      }
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      if (index >= 0) {
        let qty = state.cartItem[index].qty;
        if (qty > 1) {
          const qtyDec = --qty;
          state.cartItem[index].qty = qtyDec;

          const price = state.cartItem[index].price;
          const total = price * qtyDec;

          state.cartItem[index].total = total;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.productList = state.productList.filter(product => product._id !== action.payload._id);
        toast.success('Product deleted successfully');
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        toast.error(`Failed to delete product: ${action.payload}`);
      })
      .addCase(toggleProductStatus.fulfilled, (state, action) => {
        const { productId, isActive } = action.payload;
        const product = state.productList.find(product => product._id === productId);
        if (product) {
          product.isActive = isActive;
        }
        toast.success(`Product ${isActive ? "activated" : "deactivated"} successfully`);
      })
      .addCase(toggleProductStatus.rejected, (state, action) => {
        toast.error(`Failed to update product status: ${action.payload}`);
      });
  },
});

export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
} = productSlice.actions;

export default productSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";

// // Initial state
// const initialState = {
//   productList: [],
//   cartItem: [],
// };

// // Define async thunks
// export const deleteProduct = createAsyncThunk(
//   'product/deleteProduct',
//   async (productId, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`/api/product/${productId}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete product');
//       }

//       const responseData = await response.json();
//       return responseData.data; // Return the deleted product data
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const toggleProductStatus = createAsyncThunk(
//   'product/toggleProductStatus',
//   async ({ productId, isActive }, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`/api/products/${productId}/status`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ isActive })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update product status');
//       }

//       return { productId, isActive };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Create slice
// export const productSlice = createSlice({
//   name: "product",
//   initialState,
//   reducers: {
//     setDataProduct: (state, action) => {
//       state.productList = [...action.payload];
//     },
//     addCartItem: (state, action) => {
//       const check = state.cartItem.some((el) => el._id === action.payload._id);
//       if (check) {
//         toast("Item already in cart");
//       } else {
//         toast("Item added successfully");
//         const total = action.payload.price;
//         state.cartItem = [
//           ...state.cartItem,
//           { ...action.payload, qty: 1, total: total },
//         ];
//       }
//     },
//     deleteCartItem: (state, action) => {
//       toast("One item deleted");
//       const index = state.cartItem.findIndex((el) => el._id === action.payload);
//       state.cartItem.splice(index, 1);
//     },
//     increaseQty: (state, action) => {
//       const index = state.cartItem.findIndex((el) => el._id === action.payload);
//       if (index >= 0) {
//         let qty = state.cartItem[index].qty;
//         const qtyInc = ++qty;
//         state.cartItem[index].qty = qtyInc;

//         const price = state.cartItem[index].price;
//         const total = price * qtyInc;

//         state.cartItem[index].total = total;
//       }
//     },
//     decreaseQty: (state, action) => {
//       const index = state.cartItem.findIndex((el) => el._id === action.payload);
//       if (index >= 0) {
//         let qty = state.cartItem[index].qty;
//         if (qty > 1) {
//           const qtyDec = --qty;
//           state.cartItem[index].qty = qtyDec;

//           const price = state.cartItem[index].price;
//           const total = price * qtyDec;

//           state.cartItem[index].total = total;
//         }
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         state.productList = state.productList.filter(product => product._id !== action.payload._id);
//         toast.success('Product deleted successfully');
//       })
//       .addCase(deleteProduct.rejected, (state, action) => {
//         toast.error(`Failed to delete product: ${action.payload}`);
//       })
//       .addCase(toggleProductStatus.fulfilled, (state, action) => {
//         const { productId, isActive } = action.payload;
//         const product = state.productList.find(product => product._id === productId);
//         if (product) {
//           product.isActive = isActive;
//         }
//         toast.success(`Product ${isActive ? "activated" : "deactivated"} successfully`);
//       })
//       .addCase(toggleProductStatus.rejected, (state, action) => {
//         toast.error(`Failed to update product status: ${action.payload}`);
//       });
//   },
// });

// export const {
//   setDataProduct,
//   addCartItem,
//   deleteCartItem,
//   increaseQty,
//   decreaseQty,
// } = productSlice.actions;

// export default productSlice.reducer;







// import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";

// const initialState = {
//   productList: [],
//   cartItem: [],
// };

// export const productSlice = createSlice({
//   name: "product",
//   initialState,
//   reducers: {
//     setDataProduct: (state, action) => {
//       state.productList = [...action.payload];
//     },
//     addCartItem: (state, action) => {
//       const check = state.cartItem.some((el) => el._id === action.payload._id);
//       if (check) {
//         toast("Already Item in Cart");
//       } else {
//         toast("Item Add successfully");
//         const total = action.payload.price;
//         state.cartItem = [
//           ...state.cartItem,
//           { ...action.payload, qty: 1, total: total },
//         ];
//       }
//     },
//     deleteCartItem: (state, action) => {
//       toast("one Item Delete");
//       const index = state.cartItem.findIndex((el) => el._id === action.payload);
//       state.cartItem.splice(index, 1);
//       console.log(index);
//     },
//     increaseQty: (state, action) => {
//       const index = state.cartItem.findIndex((el) => el._id === action.payload);
//       let qty = state.cartItem[index].qty;
//       const qtyInc = ++qty;
//       state.cartItem[index].qty = qtyInc;

//       const price = state.cartItem[index].price;
//       const total = price * qtyInc;

//       state.cartItem[index].total = total;
//     },
//     decreaseQty: (state, action) => {
//       const index = state.cartItem.findIndex((el) => el._id === action.payload);
//       let qty = state.cartItem[index].qty;
//       if (qty > 1) {
//         const qtyDec = ++qty;
//         state.cartItem[index].qty = qtyDec;

//         const price = state.cartItem[index].price;
//         const total = price * qtyDec;

//         state.cartItem[index].total = total;
//       }
//     },
//   },
// });

// export const {
//   setDataProduct,
//   addCartItem,
//   deleteCartItem,
//   increaseQty,
//   decreaseQty,
// } = productSlice.actions;

// export default productSlice.reducer;