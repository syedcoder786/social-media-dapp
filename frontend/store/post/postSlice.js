import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  posts: [],
//   post: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUploading: false,
  message: "",
};

// Create new post
export const createPost = createAsyncThunk(
  "post/create",
  async (postData, thunkAPI) => {
    try {
      return await postService.createPost(postData);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch posts
export const fetchPosts = createAsyncThunk("post/fetch", async () => {
  try {
    return await postService.fetchPosts();
  } catch (error) {
    let message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// export const removeFromCart = createAsyncThunk(
//   "cart/remove",
//   async (product_id, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await cartService.removeFromCart(product_id, token);
//     } catch (error) {
//       let message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    // fetchCart: (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.cart = action.payload;
    //   localStorage.setItem("cart", JSON.stringify(action.payload));
    // },
    resetPost: (state) => {
      state.post = null;
    },
  },
  // for backend request
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isUploading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isUploading = false;
        state.isSuccess = true;
        state.posts = [action.payload, ...state.posts];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isUploading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
    //   .addCase(removeFromCart.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(removeFromCart.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //     state.cart = action.payload;
    //     localStorage.setItem("cart", JSON.stringify(action.payload));
    //     // state.goals.push(action.payload)
    //   })
    //   .addCase(removeFromCart.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.message = action.payload;
    //   });
  },
});

export const { reset, resetPost } = postSlice.actions;
export default postSlice.reducer;
