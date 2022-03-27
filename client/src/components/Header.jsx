import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';

function Header() {
    return (
        <header className='header'>
                <div className='logo'>
                    <Link to="/">Dashboard</Link>
                </div>
                <ul>
                    <li >
                        <Link to="/login">
                            <LoginIcon /> Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/register">
                            <PersonIcon /> Register
                        </Link>
                    </li>
                </ul>
        </header>
    )
}

export default Header
