import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../../features/auth/authSlice";
import LoginIcon from "@mui/icons-material/Login";
import Spinner from "../../components/Spinner";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, password } = loginData;

  const { user, isLoading, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, dispatch, navigate]);

  const onChange = (event) => {
    setLoginData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(login({ email, password }));
    dispatch(reset());
    
    setLoginData((prevState) => ({
      ...prevState,
      password: ''
    }))
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="wrapper">
        <form className="form" onSubmit={onSubmit}>
          <div className="heading">
            <h1>
              <LoginIcon fontSize="large" />
              Login
            </h1>
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
              className="form-control"
            />
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
              className="form-control"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-dark">
              Login
            </button>
          </div>
          {message ? (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
}

export default Login;
