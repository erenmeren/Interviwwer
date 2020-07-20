import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuthentication } from './redux/auth/actions';
import { IState } from './interfaces';
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Lorem from './pages/Lorem';
import Interviewer from './pages/Interviewer';

interface IProps {
  checkAuthenticationConnect: () => void;
  isAuthenticated: boolean | null;
}

function App({ checkAuthenticationConnect, isAuthenticated }: IProps) {
  React.useEffect(() => {
    checkAuthenticationConnect();
  });

  return (
    <Router>
      {isAuthenticated && <NavBar />}
      <Switch>
        {!isAuthenticated ? (
          <>
            <Route path="/login" component={ Login } />
            <Redirect to="/login" />
          </>
        ) : (
          <>
            <Route exact path="/" component={ Home } />
            <Route path="/interviwers" component={ Interviewer } />
            <Route path="/lorem" component={ Lorem } />
            <Redirect to="/" />
          </>
        )}
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state: IState) => ({
  isAuthenticated: state.userAuthData.isAuthenticated,
});

const mapDispatchToProps = {
  checkAuthenticationConnect: checkAuthentication,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
