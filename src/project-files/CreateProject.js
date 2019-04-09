import React from "react";
import { Button, Container, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { addProject, loadProject } from "../actions/projectAction";
import { checkToken } from "../actions/userAction";

class CreateProject extends React.Component {
  state = {
    user_id: this.props.user.id,
    title: ""
  };

  handleSubmit = () => {
    const projectObj = { title: this.state.title, user_id: this.props.user.id };
    this.props.addProject(projectObj, this.props.token);
    this.props.checkToken(this.props.token);
    this.setState({ title: "" });
  };

  handleChange = event => {
    this.setState({ title: event.target.value });
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            name="title"
            placeholder="Project Title"
            onChange={this.handleChange}
            value={this.state.title}
          />
          <Button type="submit">Create a Project</Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    token: state.userReducer.token,
    project: state.projectReducer.project
  };
};

export default connect(
  mapStateToProps,
  { addProject, checkToken, loadProject }
)(CreateProject);
