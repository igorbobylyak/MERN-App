import axios from 'axios';

const register = async (user) => {
    const response = await axios.post('/api/auth/registry', user);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

const login = async (user) => {
    const response = await axios.post('/api/auth/login', user);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

const logout = () => {
    localStorage.removeItem('user');
}

const authService = {
    register,
    login,
    logout
}

export default authService;