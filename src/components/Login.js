import React from "react";
import { Form, Segment } from "semantic-ui-react";

import { connect } from "react-redux";
import { getAuth } from "../actions/userAction";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.getAuth(this.state);
    setTimeout(() => {
      if (localStorage.token) {
        this.props.history.push("/home");
      } else {
        this.props.history.push("/login");
      }
    }, 500);
  };

  render() {
    const { username, password } = this.state;
    return (
      <Segment textAlign="center">
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Username"
            placeholder="username"
            name="username"
            value={username}
            onChange={this.handleChange}
          />

          <Form.Input
            label="Password"
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <Form.Button>Submit</Form.Button>
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.userReducer.user, error: state.userReducer.error };
};

export default connect(
  mapStateToProps,
  { getAuth }
)(withRouter(Login));
