import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import authReducer from "./auth/authSlice";
import postReducer from "./post/postSlice";

const combinedReducer = combineReducers({
  auth: authReducer,
  post: postReducer
//   products: productReducer,
//   cart: cartReducer,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
    //   products: {
    //     products: [...action.payload.products.products],
    //   },
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
  });

export const wrapper = createWrapper(makeStore, { debug: true });
