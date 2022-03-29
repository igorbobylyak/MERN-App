import axios from "axios";
import authService from "./auth";

const API = '/api/todos'

const getTodos = async () => {
    const headers = {
        Authorization: `Bearer ${authService.getToken()}`
    }

    try {
        const response = await axios.get(API, { headers });
        return response.data;
    } catch(err) {
        throw new Error(err.response.data.message || err.message);
    }
}

const createTodo = async (todo) => {
    const headers = {
        Authorization: `Bearer ${authService.getToken()}`
    }

    try {
        const response = await axios.post(API, todo, { headers });
        return response.data;
    } catch(err) {
        throw new Error(err.response.data.message || err.message);
    }
}

const deleteTodo = async (todoId) => {
    const headers = {
        Authorization: `Bearer ${authService.getToken()}`
    }

    try {
        const response = await axios.delete(`${API}/${todoId}`, {headers});
        return response.data;
    } catch(err) {
        throw new Error(err.response.data.message || err.message);
    }
}

const todoService = {
    getTodos,
    createTodo,
    deleteTodo
}

export default todoService;