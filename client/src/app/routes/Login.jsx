import { useState, useEffect } from 'react';

function Login() {

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = data;

    const onChange = event => {
        setData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const onSubmit = event => {
        event.preventDefault();

    }

    return (
        <>
        <div className="wrapper">
        <form className="form" onSubmit={onSubmit}>
            <div className="heading">
                <h1>Login</h1>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input 
                type="text" 
                name="email" 
                id="email" 
                value={email}
                placeholder="Enter email"
                onChange={onChange}
                required
                className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input 
                type="password" 
                name="password" 
                id="password"
                value={password}
                placeholder="Enter password"
                onChange={onChange}
                required 
                className="form-control" />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-dark">Login</button>
            </div>
        </form>
        </div>
        </>
    )
}

export default Login
