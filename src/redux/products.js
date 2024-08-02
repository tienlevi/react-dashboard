import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../api/axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const response = await baseUrl.get("/products");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id) => {
    try {
      const response = await baseUrl.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    if (confirm("Are you sure want to delete ?")) {
      try {
        const response = await baseUrl.delete(`/products/${id}`);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data) => {
    try {
      const response = await baseUrl.post("/products", data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (data) => {
    try {
      const response = await baseUrl.put(`/products/${data.id}`, data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    searchProducts: (state, action) => {
      state.products = action.payload; //truyen payload vao cap nhap searchData
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      });
    builder.addCase(getProductById.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products?.filter(
        (item) => item.id !== action.payload.id
      );
    });
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(editProduct.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      });
    builder.addCase(editProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default productSlice.reducer;
