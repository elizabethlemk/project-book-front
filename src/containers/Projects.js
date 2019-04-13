import React from "react";
import { Button, Icon, Menu, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { loadProject } from "../actions/projectAction";

import Error from "../components/Error";
import CreateProject from "../project-files/CreateProject";
import ProjectsForm from "../project-files/ProjectsForm";

class Projects extends React.PureComponent {
  state = {
    showForm: false,
    project_id: null
  };

  renderProjects = () => {
    if (this.props.projects.length > 0) {
      const { project_id } = this.state;

      if (!project_id) {
        const selected = this.props.user.projects[0].id;
        this.props.loadProject(selected);
        this.setState({ project_id: selected });
      }

      return this.props.projects.map(project => (
        <Menu.Item
          key={project.id}
          id={project.id}
          active={project_id === project.id}
          onClick={this.handleClick}
        >
          {project.title}
        </Menu.Item>
      ));
    } else {
      return (
        <Menu.Item>
          <Icon loading name="spinner" />
        </Menu.Item>
      );
    }
  };

  handleShow = () => {
    // handles if the form will show in the table or not
    this.setState({ showForm: !this.state.showForm });
  };

  handleClick = event => {
    const projectId = parseInt(event.target.id);
    this.setState({ project_id: projectId, active: true });
    this.props.loadProject(projectId);
  };

  render() {
    console.log(this.props.projects);
    return (
      <div>
        <Menu attached="top" tabular>
          <Menu.Item id="project-header">Current Projects </Menu.Item>
          {this.renderProjects()}

          {this.state.showForm ? <CreateProject /> : null}
          <Menu.Item>
            <Button animated onClick={this.handleShow}>
              {this.state.showForm ? (
                <Button.Content visible>
                  <Icon name="x" />
                </Button.Content>
              ) : (
                <Button.Content visible>
                  <Icon name="plus" />
                </Button.Content>
              )}
              <Button.Content hidden>
                {this.state.showForm ? "Cancel" : "Add"}
              </Button.Content>
            </Button>
          </Menu.Item>
        </Menu>
        <Segment attached="bottom">
          {this.state.project_id ? <ProjectsForm /> : <Error />}
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    projects: state.userReducer.user.projects
  };
};

export default connect(
  mapStateToProps,
  { loadProject }
)(Projects);
