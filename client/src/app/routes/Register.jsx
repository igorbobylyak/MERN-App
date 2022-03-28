import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../../features/auth/authSlice';
import PersonIcon from '@mui/icons-material/Person';
import Spinner from '../../components/Spinner';

function Register() {
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = registerData;

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { user, isLoading } = useSelector(state => state.auth);

    useEffect(() => {
        if (user) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, navigate, dispatch])

    const onChange = event => {
        setRegisterData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const onSubmit = event => {
        event.preventDefault();
        if (password !== password2) {
            console.log('ERROR')
        } else {
            dispatch(register({name, email, password}));
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
        <div className="wrapper">
        <form className="form" onSubmit={onSubmit}>
            <div className="heading">
                <h1><PersonIcon fontSize='large'/>Register</h1>
            </div>
            <div className="form-group">
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
                <input 
                type="email" 
                name="email" 
                id="email" 
                value={email}
                placeholder="Enter email"
                onChange={onChange}
                required
                className="form-control" />
            </div>
            <div className="form-group">
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
