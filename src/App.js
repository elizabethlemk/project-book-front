import React from "react";
import { Route, withRouter } from "react-router-dom";
import Switch from "react-router-transition-switch";
import Fader from "react-fader";
import "./App.css";

import { connect } from "react-redux";
import { checkToken, getAllUsers, getAllBlogs } from "./actions/userAction";
import { loadBlogs } from "./actions/blogAction";

import Home from "./containers/Home";
import Browse from "./containers/Browse";
import User from "./containers/User";
import Projects from "./containers/Projects";
import NavBar from "./containers/NavBar";
import Blogs from "./containers/Blogs";
import { BlogShow, ProjectShow, UserShow } from "./show-pages/Show";

import Crabs from "./components/Crabs";
import Login from "./components/Login";
import Settings from "./components/Settings";
import Signup from "./components/Signup";

class App extends React.Component {
  componentDidMount = () => {
    this.props.getAllUsers();
    this.props.getAllBlogs();
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
        <Switch component={Fader}>
          <Route exact path="/home" component={Home} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/blogs" component={Blogs} />
          <Route exact path="/browse" component={Browse} />
          <Route exact path="/user" component={User} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/logout" component={Home} />
          <Route
            exact
            path="/users/:username"
            render={props => <UserShow props={this.props} />}
          />
          <Route
            exact
            path="/blogs/:id"
            render={props => <BlogShow props={this.props} />}
          />
          <Route
            exact
            path="/projects/:id"
            render={props => <ProjectShow props={this.props} />}
          />
          <Route path="/" component={Crabs} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.userReducer.user, allUsers: state.userReducer.allUsers };
};

export default connect(
  mapStateToProps,
  { checkToken, loadBlogs, getAllBlogs, getAllUsers }
)(withRouter(App));
