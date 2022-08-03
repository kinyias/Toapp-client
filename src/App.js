import './css/style.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './component/layout/Landing';
import Auth from './views/Auth';
import AuthContextProvider from './contexts/AuthContext';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './component/routing/ProtectedRoute';
import PostContextProvider from './contexts/PostContext';

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route
              exact
              path="/login"
              render={(prop) => <Auth {...prop} authRoute="login" />}
            />
            <Route
              exact
              path="/register"
              render={(prop) => <Auth {...prop} authRoute="register" />}
            />
            <ProtectedRoute exact path="/todoapp" component={Dashboard} />
          </Switch>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
