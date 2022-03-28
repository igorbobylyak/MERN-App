import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import todoService from '../../services/todo';

const initialState = {
    todos: [],
    isLoading: false,
    message: ''
}

export const getTodos = createAsyncThunk('todos/get', async () => {
    return await todoService.getTodos();
})

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        resetTodos: (state) => {
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodos.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.isLoading = false
                state.todos = action.payload
            })
            .addCase(getTodos.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
    }
})

export const { resetTodos } = todoSlice.actions;
export default todoSlice.reducer;