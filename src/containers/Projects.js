import React from "react";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Label,
  List
} from "semantic-ui-react";
import { connect } from "react-redux";
import { loadProject } from "../actions/projectAction";

import CreateProject from "../project-files/CreateProject";
import ProjectsForm from "../project-files/ProjectsForm";

class Projects extends React.Component {
  state = {
    showForm: false,
    active: false,
    project_id: null
  };

  componentDidUpdate = prevProps => {
    if (this.props.user.project !== prevProps.user.project) {
      console.log("New projects");
    }
  };

  handleShow = () => {
    // handles if the form will show in the table or not
    this.setState({ showForm: !this.state.showForm });
  };

  handleClick = event => {
    const projectId = parseInt(event.target.id);
    this.setState({ project_id: projectId, active: true });
    this.props.loadProject(projectId, localStorage.token);
  };

  render() {
    return (
      <Container>
        <Grid columns={2}>
          <Grid.Column width={3} textAlign="center">
            <Header>Current Projects </Header>
            <List animated verticalAlign="middle">
              {this.props.user.projects !== undefined
                ? this.props.user.projects.map(project => (
                    <List.Item key={project.id}>
                      <List.Content>
                        <List.Header id={project.id} onClick={this.handleClick}>
                          <Icon name="caret right" />
                          {project.title}
                        </List.Header>
                      </List.Content>
                    </List.Item>
                  ))
                : null}
            </List>
            {this.state.showForm ? (
              <Grid.Row divided>
                <CreateProject />
              </Grid.Row>
            ) : null}

            <Grid.Row>
              <Button animated onClick={this.handleShow}>
                <Button.Content visible>
                  <Icon name="plus" />
                </Button.Content>
                <Button.Content hidden>Add</Button.Content>
              </Button>
            </Grid.Row>
          </Grid.Column>

          <Grid.Column width={13}>
            {this.state.active ? <ProjectsForm /> : null}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.userReducer.user };
};

export default connect(
  mapStateToProps,
  { loadProject }
)(Projects);
