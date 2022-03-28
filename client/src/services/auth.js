import axios from 'axios';

const register = async (user) => {
    try {
        const response = await axios.post('/api/auth/registry', user);
    
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
    
        return response.data;
    } catch(err) {
        throw Error(err.response.data.message || err.message);
    }
}

const login = async (user) => {
    try {
        const response = await axios.post('/api/auth/login', user);
    
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
    
        return response.data;
    } catch(err) {
        throw Error(err.response.data.message || err.message);
    }
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