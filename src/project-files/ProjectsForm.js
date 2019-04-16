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
import { changeCompleted } from "../actions/projectAction";
import Confetti from "react-dom-confetti";
import Crabs from "../components/Crabs";
const MoodBoard = React.lazy(() => import("./MoodBoard"));
const Comments = React.lazy(() => import("./Comments"));
const ColorPalette = React.lazy(() => import("./ColorPalette"));
const References = React.lazy(() => import("./References"));

class ProjectsForm extends React.Component {
  state = {
    active: false,
    title: this.props.project.title
  };

  handleToggle = event => {
    this.props.changeCompleted(
      !this.props.project.completed,
      this.props.project.id
    );
  };

  handleShowForm = () => {
    this.setState({ active: true });
    console.log("edit");
  };

  handleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleSubmit = () => {
    console.log("close the form");
    this.setState({ active: false });
    // this.props.updateProject(this.props.project.id, this.state.title)
  };

  handleDelete = () => {
    console.log("Delete");
  };
  render() {
    console.log(this.props.project);
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
  { changeCompleted }
)(ProjectsForm);
