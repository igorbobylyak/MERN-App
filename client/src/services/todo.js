import axios from "axios";
import authService from "./auth";

const getTodos = async () => {
    const headers = {
        Authorization: `Bearer ${authService.getToken()}`
    }
    try {
        const response = await axios.get('/api/todos', { headers });
        return response.data;
    } catch(err) {
        throw new Error(err.response.data.message || err.message);
    }
}

const todoService = {
    getTodos
}

export default todoService;