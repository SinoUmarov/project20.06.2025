import { createSlice } from "@reduxjs/toolkit";

export const InfoById = createSlice({
    name: 'infobyid',
    initialState: {
        todo: []
    },
    reducers: {
        setTodo: (state, action) => {
            state.todo = action.payload
        }
    }
})

export default InfoById.reducer
export const { setTodo } = InfoById.actions