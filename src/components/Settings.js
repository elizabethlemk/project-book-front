import React from "react";
import { Container, Form, Header, Image, Tab } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import { connect } from "react-redux";

class Edit extends React.Component {
  state = {
    first_name: this.props.user.first_name,
    last_name: this.props.user.last_name,
    email: this.props.user.email,
    birthday: this.props.user.birthday,
    image: this.props.user.image
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
    const { first_name, last_name, email, birthday, image } = this.state;
    formData.append("user[image]", image);
    formData.append("user[last_name]", last_name);
    formData.append("user[first_name]", first_name);
    formData.append("user[email]", email);
    formData.append("user[birthday]", birthday);

    this.props.updateUser(formData);
  };
  render() {
    const { first_name, last_name, email, birthday } = this.state;
    return (
      <Container textAlign="center">
        <Form onSubmit={this.handleSubmit}>
          <Image src={this.props.user.image} avatar />
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
          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>
    );
  }
}

class Account extends React.Component {
  state = {
    username: this.props.user.username,
    password: this.props.user.password,
    password_confirmation: this.props.user.password_confirmation
  };
  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.updateUser(this.state);
  };
  render() {
    const { password, username, password_confirmation } = this.state;
    return (
      <Container textAlign="center">
        <Image />
        <Form onSubmit={this.handleSubmit}>
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
      </Container>
    );
  }
}

class Settings extends React.Component {
  state = { activeIndex: 0 };

  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

  render() {
    console.log(this.props);
    const { activeIndex } = this.state;
    const panes = [
      {
        menuItem: "Edit Profile",
        render: () => (
          <Tab.Pane>
            <Edit user={this.props.user} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Account Info",
        render: () => (
          <Tab.Pane>
            <Account user={this.props.user} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Favorites",
        render: () => <Tab.Pane textAlign="center">Favorites go here</Tab.Pane>
      }
    ];
    return (
      <Container id="settings">
        <Header textAlign="center">Settings</Header>
        <Tab
          menu={{ fluid: true, vertical: true, tabular: true }}
          panes={panes}
          activeIndex={activeIndex}
          onTabChange={this.handleTabChange}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};

export default connect(mapStateToProps)(Settings);
