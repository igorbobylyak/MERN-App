import { useState, useEffect } from 'react';

function Register() {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = data;

    const onChange = event => {
        setData((...prevState) => ({
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
                <h1>Register</h1>
            </div>
            <div className="form-group">
                <label htmlFor="Name">Name:</label>
                <input 
                type="text" 
                name="name" 
                id="name" 
                value={name}
                placeholder="Enter name"
                onChange={onChange}
                required
                className="form-control" />
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
                <label htmlFor="password2">Confirm password:</label>
                <input 
                type="password" 
                name="password2" 
                id="password2"
                value={password2}
                placeholder="Confirm password"
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

export default Register
