import { drawerClasses } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
const getStarFromStorage = () => {
  try {
    const starData = localStorage.getItem("star");
    // Eğer starData mevcut değilse veya geçerli bir JSON değilse, boş bir dizi döneriz.
    return starData ? JSON.parse(starData) : [];
  } catch (error) {
    console.error("Error parsing star data from localStorage", error);
    return []; // Geçersiz JSON veya başka bir hata durumunda boş bir dizi döneriz.
  }
};

const initialState = {
  productsStar: getStarFromStorage(),
  drawerStar: false,
};

const writeFromStarToStorage = (star) => {
  try {
    localStorage.setItem("star", JSON.stringify(star));
  } catch (error) {
    console.error("Error writing star data to localStorage", error);
  }
};

export const starSlice = createSlice({
  name: "star",
  initialState,
  reducers: {
    addToStar: (state, action) => {
      const productExists = state.productsStar.some(
        (product) => product.id === action.payload.id
      );

      if (!productExists) {
        state.productsStar = [...state.productsStar, action.payload];
        writeFromStarToStorage(state.productsStar);
      }
    },
    removeToStar: (state, action) => {
      const extractedProducts = state.productsStar.filter(
        (product) => product.id !== action.payload.id
      );
      state.productsStar = extractedProducts;
      writeFromStarToStorage(state.productsStar);
    },
    setStarDrawer: (state) => {
      state.drawerStar = !state.drawerStar;
    },
  },
});

export const { addToStar, removeToStar, setStarDrawer } = starSlice.actions;
export default starSlice.reducer;
