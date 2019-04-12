import React from "react";
import { Button, Icon, Menu, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { loadProject } from "../actions/projectAction";

import CreateProject from "../project-files/CreateProject";
import ProjectsForm from "../project-files/ProjectsForm";

class Projects extends React.Component {
  state = {
    showForm: false,
    project_id: null
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
    console.log(this.props);
    const { project_id } = this.state;
    return (
      <div>
        <Menu attached="top" tabular>
          <Menu.Item id="project-header">Current Projects </Menu.Item>

          {this.props.projects.length > 0
            ? this.props.projects.map(project => (
                <Menu.Item
                  key={project.id}
                  id={project.id}
                  active={project_id === project.id}
                  onClick={this.handleClick}
                >
                  {project.title}
                </Menu.Item>
              ))
            : null}
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
          {this.state.project_id ? <ProjectsForm /> : null}
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
