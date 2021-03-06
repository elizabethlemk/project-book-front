import React from "react";
import { Button, Form, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { addProject, loadProject } from "../actions/projectAction";

class CreateProject extends React.Component {
  state = {
    user_id: this.props.user.id,
    title: ""
  };

  handleSubmit = () => {
    const projectObj = {
      title: this.state.title,
      user_id: this.props.user.id,
      completed: false
    };
    this.props.addProject(projectObj);
    this.setState({ title: "" });
    this.props.handleShow();
  };

  handleChange = event => {
    this.setState({ title: event.target.value });
  };

  render() {
    return (
      <Menu.Item>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            name="title"
            placeholder="Project Title"
            onChange={this.handleChange}
            value={this.state.title}
          />
          <Button type="submit">Create a Project</Button>
        </Form>
      </Menu.Item>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    project: state.projectReducer.project
  };
};

export default connect(
  mapStateToProps,
  { addProject, loadProject }
)(CreateProject);
