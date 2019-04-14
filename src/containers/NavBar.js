import React from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Dropdown,
  Header,
  Icon,
  Input,
  Menu,
  Search
} from "semantic-ui-react";
import SearchField from "./SearchField";

import { connect } from "react-redux";
import { logOut } from "../actions/userAction";
import { withRouter } from "react-router-dom";

// <Menu.Item>
//   <Input icon="search" placeholder="Search..." />
// </Menu.Item>

class NavBar extends React.Component {
  state = {
    activeItem: ""
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleLogOut = () => {
    this.props.logOut();
    this.props.history.push("/home");
  };

  render() {
    let username;
    if (this.props.user) {
      username = this.props.user.username;
    }
    const { activeItem } = this.state;
    let loginOptions = null;
    if (localStorage.token) {
      loginOptions = (
        <Menu.Menu position="right">
          <SearchField />
          {username ? (
            <Dropdown
              item
              text={username}
              active={(activeItem === "user").toString()}
              onClick={this.handleItemClick}
            >
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} exact to="/user">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} exact to="/settings">
                  Settings
                </Dropdown.Item>
                <Dropdown.Item as={Button} onClick={this.handleLogOut}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Menu.Item>
              <Icon loading name="spinner" />
            </Menu.Item>
          )}
          }
        </Menu.Menu>
      );
    } else {
      loginOptions = (
        <Menu.Menu position="right">
          <SearchField />
          <Menu.Item
            as={NavLink}
            exact
            to="/signup"
            name="signup"
            active={activeItem === "signup"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={NavLink}
            exact
            to="/login"
            name="login"
            active={activeItem === "login"}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      );
    }

    return (
      <Menu color="olive" className="navbar">
        <Menu.Item
          as={NavLink}
          exact
          to="/home"
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        />
        {localStorage.token ? (
          <Menu.Menu>
            <Menu.Item
              as={NavLink}
              exact
              to="/projects"
              name="projects"
              active={activeItem === "projects"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={NavLink}
              exact
              to="/blogs"
              name="blogs"
              active={activeItem === "blogs"}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        ) : null}
        <Menu.Item
          as={NavLink}
          exact
          to="/browse"
          name="browse"
          active={activeItem === "browse"}
          onClick={this.handleItemClick}
        />{" "}
        <Menu.Menu position="right">
          <Header as="h1" id="middle">
            {" "}
            Project Book{" "}
          </Header>
        </Menu.Menu>
        {loginOptions}
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    allUsers: state.userReducer.allUsers
  };
};

export default connect(
  mapStateToProps,
  { logOut }
)(withRouter(NavBar));
