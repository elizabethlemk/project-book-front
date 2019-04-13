import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./App.css";

import { connect } from "react-redux";
import { checkToken } from "./actions/userAction";
import { loadBlogs } from "./actions/blogAction";

import Home from "./containers/Home";
import Browse from "./containers/Browse";
import User from "./containers/User";
import Projects from "./containers/Projects";
import NavBar from "./containers/NavBar";
import Blogs from "./containers/Blogs";
import { BlogShow, ProjectShow, UserShow } from "./show-pages/Show";

import Error from "./components/Error";
import Login from "./components/Login";
import Settings from "./components/Settings";
import Signup from "./components/Signup";

class App extends React.Component {
  componentDidMount = () => {
    if (localStorage.token) {
      this.props.checkToken();
    } else {
      this.props.history.push("/home");
    }
  };

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/blogs" component={Blogs} />
          <Route exact path="/browse" component={Browse} />
          <Route exact path="/user" component={User} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/logout" component={Home} />
          <Route exact path="/user/:id" component={UserShow} />
          <Route exact path="/blog/:id" component={BlogShow} />
          <Route exact path="/projects/:id" component={ProjectShow} />
          <Route path="/" component={Error} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.userReducer.user };
};

export default connect(
  mapStateToProps,
  { checkToken, loadBlogs }
)(withRouter(App));
