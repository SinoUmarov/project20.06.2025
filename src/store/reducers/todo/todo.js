import { createSlice } from "@reduxjs/toolkit";

export const todo = createSlice({
  name: "todoList",
  initialState: {
    todo: [],
    name: "",
    description: "",
    editName: "",
    editDesc: "",
    idx: null,
    loading: false,
    error: false,
    info: null,
    modal: false,
    img: '',
    imgImage: '',
    modaladd: false,
    imgid: null,
  },
  reducers: {
    setTodo: (state, action) => {
      state.todo = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setEditName: (state, action) => {
      state.editName = action.payload;
    },
    setEditDesc: (state, action) => {
      state.editDesc = action.payload;
    },
    setIdx: (state, action) => {
      state.idx = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setImg: (state, action) => {
        state.img = action.payload
    },
    setImgImage: (state, action) => {
        state.img = action.payload
    },
    setmodaladd: (state, action) => {
        state.modaladd = action.payload
    },
    setimgid: (state, action) => {
        state.imgid = action.payload
    }
  },
});

export default todo.reducer;
export const {
  setTodo, setImgImage,
  setIdx, setInfo, setModal,
  setName, setImg,
  setDescription,
  setEditName,
  setEditDesc, setimgid,
  setError,
  setLoading, setmodaladd,
} = todo.actions;
