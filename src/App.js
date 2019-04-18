import React from "react";
import { Route, withRouter } from "react-router-dom";
import Switch from "react-router-transition-switch";
import Fader from "react-fader";
import "./App.css";

import { connect } from "react-redux";
import {
  checkToken,
  getAllUsers,
  getAllBlogs,
  getAllProjects
} from "./actions/userAction";
import { loadBlogs } from "./actions/blogAction";

import Home from "./containers/Home";
import Browse from "./containers/Browse";
import NavBar from "./containers/NavBar";
import Login from "./components/Login";
import Loaders from "./components/Loaders";
import Signup from "./components/Signup";

const User = React.lazy(() => import("./containers/User"));
const Projects = React.lazy(() => import("./containers/Projects"));
const Blogs = React.lazy(() => import("./containers/Blogs"));
const Crabs = React.lazy(() => import("./components/Crabs"));
const Settings = React.lazy(() => import("./components/Settings"));

class App extends React.Component {
  componentDidMount = () => {
    this.props.getAllUsers();
    this.props.getAllProjects();
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
          <Route
            exact
            path="/projects"
            render={() => (
              <React.Suspense fallback={<Loaders />}>
                {" "}
                <Projects />
              </React.Suspense>
            )}
          />
          <Route
            exact
            path="/blogs"
            render={() => (
              <React.Suspense fallback={<Loaders />}>
                {" "}
                <Blogs />
              </React.Suspense>
            )}
          />
          <Route exact path="/browse" component={Browse} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route
            exact
            path="/settings"
            render={() => (
              <React.Suspense fallback={<Loaders />}>
                {" "}
                <Settings />
              </React.Suspense>
            )}
          />
          <Route exact path="/logout" component={Home} />
          <Route
            exact
            path="/users/:username"
            render={props => {
              const username = props.location.pathname.split("/")[2];
              const selectedUser = this.props.allUsers.find(
                users => users.username === username
              );
              if (selectedUser) {
                return (
                  <React.Suspense fallback={<Loaders />}>
                    {" "}
                    <User user={selectedUser} />
                  </React.Suspense>
                );
              }
            }}
          />

          <Route
            path="/"
            render={() => (
              <React.Suspense fallback={<Loaders />}>
                {" "}
                <Crabs />
              </React.Suspense>
            )}
          />
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
  { checkToken, loadBlogs, getAllBlogs, getAllUsers, getAllProjects }
)(withRouter(App));
