import { createSlice } from "@reduxjs/toolkit"
import { REHYDRATE } from "redux-persist"

const initialState = {
  mode: "light",
  user: {
    friends: [],
  },
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      console.log('setMode action dispatched')
      state.mode = state.mode === "light" ? "dark" : "light"
    },
    setLogin: (state, action) => {
      console.log('setLogin action dispatched')
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setLogout: (state) => {
      console.log('setLogout action dispatched')
      state.user = null
      state.token = null
    },
    setFriends: (state, action) => {
      console.log('setFriends action dispatched')
      if (!state.user) {
        state.user = { friends: [] };
      }
      state.user.friends = action.payload.friends;
    },
    setPosts: (state, action) => {
      if (action.payload.posts) {
        state.posts = action.payload.posts
      } else {
        console.error('setPosts action dispatched without posts data')
      }
    },
    setPost: (state, action) => {
      console.log('setPost action dispatched')
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post
        return post
      })
      state.posts = updatedPosts
    },
    removePost: (state, action) => {
      console.log('removePost action dispatched')
      state.posts = state.posts.filter(post => post._id !== action.payload.postId)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action) => {
      console.log('Rehydrating state', action.payload)
      return state;
    })
  },
})


export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, removePost } =
  authSlice.actions
export default authSlice.reducer