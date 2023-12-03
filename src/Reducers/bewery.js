import { createSlice } from "@reduxjs/toolkit";

const bewerySlice = createSlice({
  name: "bewery",
  initialState: {
    value: {
      id: "",
      name: "",
      brewery_type: "",
      address: "",
      city: "",
      state_province: "",
      postal_code: "",
      country: "",
      longitude: "",
      latitude: "",
      phone: "",
      website_url: "",
      state: "",
      street: ""
    }
  },
  reducers: {
    getBeweryData: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { getBeweryData } = bewerySlice.actions;

export default bewerySlice.reducer;
