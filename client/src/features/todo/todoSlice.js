import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import todoService from '../../services/todo';

const initialState = {
    todos: [],
    isLoading: false,
    message: ''
}

export const getTodos = createAsyncThunk('todos/get', async (thunkAPI) => {
    try {
        return await todoService.getTodos();
    } catch(err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteTodo = createAsyncThunk('todo/delete', async (todoId, thunkAPI) => {
    try {
        return await todoService.deleteTodo(todoId);
    } catch(err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
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
            .addCase(deleteTodo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.isLoading = false
                state.todos = state.todos.filter(todo => todo._id !== action.payload._id);
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
    }
})

export const { resetTodos } = todoSlice.actions;
export default todoSlice.reducer;