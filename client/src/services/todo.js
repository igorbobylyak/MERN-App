import axios from "axios";

const token = JSON.parse(localStorage.getItem('user')).token;

const headers = {
    Authorization: `Bearer ${token}`
};

const getTodos = async () => {
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