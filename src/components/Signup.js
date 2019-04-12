import React from "react";
import { Container, Divider, Form, Header, Segment } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";

import { withRouter } from "react-router-dom";
import { addUser, getAuth } from "../actions/userAction";
import { connect } from "react-redux";

class Signup extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    password_confirmation: "",
    email: "",
    birthday: "",
    image: {
      image_url:
        "https://s3.us-east-2.amazonaws.com/project-book-mod-5/avatar-default.png"
    }
  };

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  handleFile = event => {
    this.setState({
      image: event.target.files[0]
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
    const {
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
      username,
      birthday,
      image
    } = this.state;
    formData.append("user[image]", image);
    formData.append("user[last_name]", last_name);
    formData.append("user[first_name]", first_name);
    formData.append("user[email]", email);
    formData.append("user[password]", password);
    formData.append("user[password_confirmation]", password_confirmation);
    formData.append("user[birthday]", birthday);
    formData.append("user[username]", username);

    if (this.props.addUser(formData)) {
      this.props.history.push("/home");
    } else {
      window.alert("Invalid login credentials");
    }
  };

  render() {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      password_confirmation,
      birthday
    } = this.state;
    return (
      <Container id="splash">
        <Segment textAlign="center" id="user-form">
          <Header id="username">Sign up for an account</Header>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              type="file"
              name="image"
              label="Profile Picture"
              onChange={this.handleFile}
            />

            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="First name"
                placeholder="First name"
                name="first_name"
                onChange={this.handleChange}
                value={first_name}
              />

              <Form.Input
                fluid
                label="Last name"
                placeholder="Last name"
                name="last_name"
                onChange={this.handleChange}
                value={last_name}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Email Address"
                placeholder="example@projectbook.com"
                name="email"
                onChange={this.handleChange}
                value={email}
              />

              <DateInput
                label="Birthday"
                name="birthday"
                placeholder="Date"
                dateFormat="MM/DD/YYYY"
                value={birthday}
                iconPosition="left"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Divider horizontal>
              <Header as="h2">Account Details</Header>
            </Divider>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Username"
                value={username}
                placeholder="Username"
                name="username"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Password"
                value={password}
                placeholder="Password"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                label="Password Confirmation"
                value={password_confirmation}
                placeholder="Retype Password"
                type="password"
                name="password_confirmation"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Button>Submit</Form.Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { error: state.userReducer.error };
};

export default connect(
  mapStateToProps,
  { addUser, getAuth }
)(withRouter(Signup));
