import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";

import './App.css';

import { connect } from 'react-redux'
import { checkToken } from './actions/userAction'

import Home from './containers/Home'
import Forum from './containers/Forum'
import User from './containers/User'
import Projects from './containers/Projects'
import NavBar from './containers/NavBar'
import Blogs from './containers/Blogs'

import Error from './components/Error'
import Login from './components/Login'
import Settings from './components/Settings'
import Signup from './components/Signup'

class App extends React.Component {

  componentDidMount = () => {
    let token = localStorage.token;
    this.props.history.push("/home")
    return token ? this.props.checkToken(token) : this.props.history.push("/home")
  };

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/blogs" component={Blogs} />
          <Route exact path="/forum" component={Forum} />
          <Route exact path="/user" component={User} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/logout" component={Home} />
          <Route path="/" component={Error} />
        </Switch>
      </div>
    );
  }
}

export default connect(null, {checkToken})(withRouter(App));
