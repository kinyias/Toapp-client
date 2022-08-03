import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const LoginForm = () => {
  //Context
  const { loginUser } = useContext(AuthContext);

  //Local state
  const [loginForm, setloginForm] = useState({
    username: '',
    password: '',
  });

  //Set alert state
  const [alert, setAlert] = useState('');

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setloginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        // history.push('/todoapp')
      } else {
        setAlert(loginData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="title">
        <div style={{ color: 'red' }}>{alert}</div>
        <h1>Login</h1>
        <span>login here using your username and password</span>
      </div>
      <form className="form-login" onSubmit={login}>
        <div className="username">
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </div>
        <div className="password">
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </div>
        <button className="btn btn-login" type="submit">
          Login
        </button>
        <div className="bottom-form">
          <div className="forgot-password">Don't have account?</div>
          <Link to="/register">
            <button className="btn btn-signup">
              Sign Up
            </button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
