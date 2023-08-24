import { configureStore } from "@reduxjs/toolkit";
import { gameDataReducer } from "./slices/gameSlice/gameSlice";
import { pinData } from "./slices/gameSlice/pinSlice";

const store = configureStore({
    reducer:{
        gamesData: gameDataReducer,
        pin:pinData
    },
    middleware:(getDefaultMiddleware) => [...getDefaultMiddleware()]
})

export default store