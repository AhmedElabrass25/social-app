import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { postsReducer } from "./postsSlice";
import { commentReducer } from "./commentSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    comments: commentReducer,
  },
});
export default store;
