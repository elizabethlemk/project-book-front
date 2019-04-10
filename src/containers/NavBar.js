import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Dropdown, Header, Input, Menu } from "semantic-ui-react";

import { connect } from "react-redux";
import { logOut } from "../actions/userAction";
import { withRouter } from "react-router-dom";

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
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
          <Dropdown
            item
            text={username !== "undefined" ? username : null}
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
        </Menu.Menu>
      );
    } else {
      loginOptions = (
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
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
            <Menu.Item
              as={NavLink}
              exact
              to="/forum"
              name="forum"
              active={activeItem === "forum"}
              onClick={this.handleItemClick}
            />{" "}
          </Menu.Menu>
        ) : null}

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
  return { user: state.userReducer.user };
};

export default connect(
  mapStateToProps,
  { logOut }
)(withRouter(NavBar));
