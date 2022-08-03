import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const RegisterForm = () => {
  //Context
  const { registerUser } = useContext(AuthContext);

  //Local state
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  //Set alert state
  const [alert, setAlert] = useState('');

  const { username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const register = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert('Passwords do not match');
      return;
    }

    try {
      const registerData = await registerUser(registerForm);
      if (registerData.success) {
        // history.push('/todoapp')
      } else {
        setAlert(registerData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="title">
        <div style={{ color: 'red', marginBottom: '1rem' }}>{alert}</div>
        <h1>Register</h1>
        <span>Register your username and password here</span>
      </div>
      <form className="form-login" onSubmit={register}>
        <div className="username">
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeRegisterForm}
          />
        </div>
        <div className="password">
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeRegisterForm}
          />
        </div>
        <div className="password">
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          />
        </div>
        <button className="btn btn-login" type="submit">
          Sign Up
        </button>
        <div className="bottom-form">
          <a href>
            <div className="forgot-password">Already have an account?</div>
          </a>
          <Link to="/login">
            <button className="btn btn-signup">Login</button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
