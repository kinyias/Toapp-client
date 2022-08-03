import LoginForm from '../component/auth/LoginForm';
import RegisterForm from '../component/auth/RegisterForm';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Spinner from './Spinner';

const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  let body;

  if (authLoading) {
    body = <Spinner></Spinner>;
  } else if (isAuthenticated) return <Redirect to="/todoapp" />;
  else
    body = (
      <>
        {authRoute === 'login' && <LoginForm />}
        {authRoute === 'register' && <RegisterForm />}
      </>
    );
  return (
    <div className="login-wrapper">
      <div className="login-container">{body}</div>
    </div>
  );
};

export default Auth;
