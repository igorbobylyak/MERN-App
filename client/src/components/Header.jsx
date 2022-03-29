import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        {user ? (
          <>
            <Link to="/">Dashboard</Link>
            {user.role && user.role === "admin" ? (
              <Link to="/admin">Admin</Link>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </div>
      {!user ? (
        <ul>
          <li>
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
      ) : (
        <div className="welcome-container">
          <p>Welcome, {user.name}</p>
          <button className="btn btn-dark" onClick={onLogout}>
            <LogoutIcon /> Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
