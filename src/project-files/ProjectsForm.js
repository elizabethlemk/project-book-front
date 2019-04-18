import React from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Grid,
  Header
} from "semantic-ui-react";
import Loaders from "../components/Loaders";
import { connect } from "react-redux";
import { deleteProject, updateProject } from "../actions/userAction";
import {
  changeCompleted,
  resetProject,
  updateTitle
} from "../actions/projectAction";
import Confetti from "react-dom-confetti";
import Crabs from "../components/Crabs";
const MoodBoard = React.lazy(() => import("./MoodBoard"));
const Comments = React.lazy(() => import("./Comments"));
const ColorPalette = React.lazy(() => import("./ColorPalette"));
const References = React.lazy(() => import("./References"));

class ProjectsForm extends React.Component {
  state = {
    active: false,
    title: ""
  };

  componentDidUpdate = prevProps => {
    if (this.props.project.id !== prevProps.project.id) {
      this.setState({ title: this.props.project.title });
    }
  };
  handleToggle = event => {
    this.props.changeCompleted(
      !this.props.project.completed,
      this.props.project.id
    );
  };

  handleShowForm = () => {
    this.setState({ active: true });
  };

  handleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleSubmit = () => {
    this.setState({ active: false });
    this.props.updateTitle(this.state.title, this.props.project.id);
    // this is breaking the page for some reason
    this.props.updateProject({
      ...this.props.project,
      title: this.state.title
    });
  };

  handleDelete = () => {
    this.props.deleteProject(this.props.project.id);
    this.props.resetProject();
  };
  render() {
    return (
      <Grid columns="equal" centered style={{ zIndex: "2" }}>
        {this.props.project.title === "Crab Party" ? <Crabs /> : null}
        <div style={{ flex: 1 }} />
        <Confetti active={this.props.project.completed} />
        <Checkbox
          toggle
          checked={this.props.project.completed}
          onChange={this.handleToggle}
          id="completed"
          style={{ marginRight: "1vw", marginTop: "2vh" }}
          label="Completed?"
        />
        <Dropdown
          item
          icon="setting"
          pointing="right"
          style={{ marginRight: "1vw", marginTop: "2vh" }}
        >
          <Dropdown.Menu>
            <Dropdown.Item onClick={this.handleShowForm}>
              Edit Project Name
            </Dropdown.Item>
            <Dropdown.Item onClick={this.handleDelete}>
              Delete Project
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Grid.Row columns={3} centered style={{ padding: "1rem" }}>
          {this.state.active ? (
            <Header>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input
                  onChange={this.handleChange}
                  style={{ width: "50vw" }}
                  value={this.state.title}
                  placeholder={this.state.title}
                />
                <Button type="submit">Submit</Button>
              </Form>
            </Header>
          ) : (
            <Header id="moodboard-title">{this.props.project.title} </Header>
          )}

          <Grid.Column width={3}>
            <React.Suspense fallback={<Loaders />}>
              <Comments />
            </React.Suspense>
          </Grid.Column>
          <Grid.Column width={9}>
            <React.Suspense fallback={<Loaders />}>
              <ColorPalette />
              <MoodBoard />
            </React.Suspense>
          </Grid.Column>
          <Grid.Column width={4}>
            <React.Suspense fallback={<Loaders />}>
              <References />
            </React.Suspense>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
  { changeCompleted, deleteProject, resetProject, updateTitle, updateProject }
)(ProjectsForm);
