import { createSlice } from "@reduxjs/toolkit";

export const rtccategories = createSlice({
    name: 'rtccategories',
    initialState: {
        todo: [],
        name: '',
        editName: '',
        idx: null,
        info: null,
        modal: false,
        loading: false,
        error: false,
    },
    reducers: {
        setTodo: (state, action) => {
            state.todo = action.payload
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        setEditName: (state, action) => {
            state.editName = action.payload
        },
        setIdx: (state, action) => {
            state.idx = action.payload
        },
        setInfo: (state, action) => {
            state.info = action.payload
        },
        setModal: (state, action) => {
            state.modal = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
    }
})

export default rtccategories.reducer
export const { setLoading, setTodo, setError, setName, setEditName, setIdx, setInfo, setModal } = rtccategories.actions