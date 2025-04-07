import axios from "axios";
import toast from "react-hot-toast";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  isError: null,
  postComments: {},
};

// Add Comment
export const addComment = createAsyncThunk(
  "comment/addComment",
  async ({ postId, content }, thunkAPI) => {
    try {
      const token = localStorage.getItem("socialToken");
      const headers = { token };

      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/comments",
        {
          content,
          post: postId,
        },
        { headers }
      );
      return { postId, comments: data.comments };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// getPostComment
export const getPostComment = createAsyncThunk(
  "comment/getPostComment",
  async (postId, thunkAPI) => {
    try {
      const token = localStorage.getItem("socialToken");
      const headers = { token };

      const { data } = await axios(
        `https://linked-posts.routemisr.com/posts/${postId}/comments`,

        { headers }
      );
      return { postId, comments: data.comments };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// DelteCommen
export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async ({ commentId, postId }, thunkAPI) => {
    try {
      const token = localStorage.getItem("socialToken");
      const headers = { token };
      const { data } = await axios.delete(
        `https://linked-posts.routemisr.com/comments/${commentId}`,

        { headers }
      );
      toast.success("the commmet is deleted successfully");
      return { commentId, postId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Edit Commen
export const editComment = createAsyncThunk(
  "comment/editComment",
  async ({ commentId, content }, thunkAPI) => {
    try {
      const token = localStorage.getItem("socialToken");
      const headers = { token };

      const { data } = await axios.put(
        `https://linked-posts.routemisr.com/comments/${commentId}`,
        { content: content },
        { headers }
      );
      toast.success("the commmet is updated successfully");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // =======Add comment to post=======
    builder
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        const { postId, comments } = action.payload;
        state.postComments[postId] = comments;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
    // =======Get Post comments===========
    builder
      .addCase(getPostComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostComment.fulfilled, (state, action) => {
        state.isLoading = false;
        const { postId, comments } = action.payload;
        state.postComments[postId] = comments;
      })
      .addCase(getPostComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
    //  =========== Delete comment ===========
    builder
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        const { postId, commentId } = action.payload;
        if (state.postComments[postId]) {
          state.postComments[postId] = state.postComments[postId].filter(
            (comment) => comment._id !== commentId
          );
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
    // =========Edit comment=======
    builder
      .addCase(editComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editComment.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedComment = action.payload.comment;
        const postId = updatedComment.post;
        state.postComments[postId] = state.postComments[postId].map((comment) =>
          comment._id === updatedComment._id ? updatedComment : comment
        );
      })
      .addCase(editComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const commentReducer = commentSlice.reducer;
