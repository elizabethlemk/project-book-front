import React from "react";
import {
  Button,
  Container,
  Form,
  Header,
  Icon,
  Image,
  Modal,
  Tab
} from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import { connect } from "react-redux";
import { updateUser, deleteUser } from "../actions/userAction";

class Edit extends React.Component {
  state = {
    first_name: this.props.user.first_name,
    last_name: this.props.user.last_name,
    email: this.props.user.email,
    birthday: this.props.user.birthday,
    image: null
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
    if (image) {
      formData.append("user[image]", image);
    }
    formData.append("user[last_name]", last_name);
    formData.append("user[first_name]", first_name);
    formData.append("user[email]", email);
    formData.append("user[birthday]", birthday);

    this.props.updateUser(this.props.user.id, formData);
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
    const formData = new FormData();
    const { username, password, password_confirmation } = this.state;
    formData.append("user[username]", username);
    formData.append("user[password]", password);
    formData.append("user[password_confirmation]", password_confirmation);
    this.props.updateUser(this.props.user.id, formData);
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

class Delete extends React.Component {
  state = {
    active: false
  };

  handleOpen = () => {
    console.log("open");
    this.setState({ active: true });
  };

  handleClose = () => {
    console.log("close");
    this.setState({ active: false });
  };

  handleDelete = () => {
    this.setState({ active: false });
    console.log(this.props.user);
    this.props.deleteUser(this.props.user.id);
    this.props.history.push("/home");
  };
  render() {
    return (
      <Container>
        <Modal
          trigger={
            <Button onClick={this.handleOpen} style={{ marginTop: "3vh" }}>
              Delete Account
            </Button>
          }
          basic
          size="small"
          open={this.state.active}
          onClose={this.handleClose}
        >
          <Header icon="trash alternate" content="Delete your account" />
          <Modal.Content>
            <p>
              Are you sure you want to delete your account? This is permanent,
              and can not be reverted.
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color="red" inverted onClick={this.handleClose}>
              <Icon name="remove" /> No
            </Button>
            <Button basic color="green" inverted onClick={this.handleDelete}>
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
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
            <Edit user={this.props.user} updateUser={this.props.updateUser} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Account Info",
        render: () => (
          <Tab.Pane>
            <Account
              user={this.props.user}
              updateUser={this.props.updateUser}
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Delete Account",
        render: () => (
          <Tab.Pane textAlign="center">
            <Delete user={this.props.user} deleteUser={this.props.deleteUser} />
          </Tab.Pane>
        )
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

export default connect(
  mapStateToProps,
  { updateUser, deleteUser }
)(Settings);
