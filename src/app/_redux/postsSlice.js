import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const initialState = {
  allPosts: [],
  isLoading: false,
  isError: null,
  post: null,
  userPosts: [],
};

// Get All Posts
export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("socialToken");
      const headers = { token };
      const { data } = await axios(
        "https://linked-posts.routemisr.com/posts?limit=50",
        { headers }
      );
      return data.posts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Get Single Post
export const getSinglePost = createAsyncThunk(
  "posts/getSinglePost",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("socialToken");
      const headers = { token };
      const { data } = await axios(
        `https://linked-posts.routemisr.com/posts/${id}`,
        { headers }
      );
      return data.post;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Get User Posts
export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (userId, thunkAPI) => {
    try {
      const token = localStorage.getItem("socialToken");
      const headers = { token };
      const { data } = await axios(
        `https://linked-posts.routemisr.com/users/${userId}/posts`,
        { headers }
      );
      //   console.log(data);
      return data.posts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// delete Posts
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, thunkAPI) => {
    try {
      const token = localStorage.getItem("socialToken");
      const headers = { token };
      const { data } = await axios.delete(
        `https://linked-posts.routemisr.com/posts/${postId}`,
        { headers }
      );
      console.log(data);
      return data.post;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// edit Posts
export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ postId, formData }, thunkAPI) => {
    console.log(postId, formData);
    try {
      const token = localStorage.getItem("socialToken");
      const headers = { token };
      const { data } = await axios.put(
        `https://linked-posts.routemisr.com/posts/${postId}`,
        formData,
        { headers }
      );
      console.log(data);
      return data.post;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//   =====================
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Posts
    builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true;
      state.allPosts = [];
      state.isError = null;
    }),
      builder.addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allPosts = action.payload;
      }),
      builder.addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.allPosts = [];
        state.isError = action.payload;
      });
    // Get Single Post
    builder.addCase(getSinglePost.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getSinglePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
      }),
      builder.addCase(getSinglePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
    // Get User Post
    builder.addCase(getUserPosts.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userPosts = action.payload;
      }),
      builder.addCase(getUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
    // Delete Post
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        const postId = action.payload._id;
        state.userPosts = state.userPosts.filter((post) => post._id !== postId);
      }),
      builder.addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
    // EDIT Post
    builder.addCase(editPost.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(editPost.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedPost = action.payload;
        const postId = updatedPost._id;
        state.userPosts = state.userPosts.map((post) =>
          post._id === postId ? updatedPost : post
        );
      }),
      builder.addCase(editPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});
export const postsReducer = postsSlice.reducer;
