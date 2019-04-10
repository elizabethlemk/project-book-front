import React from "react";
import MoodBoard from "./MoodBoard";
import Comments from "./Comments";
import ColorPalette from "./ColorPalette";
import References from "./References";
import { Checkbox, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { changeCompleted } from "../actions/projectAction";

class ProjectsForm extends React.Component {
  state = {
    completed: false
  };

  componentDidMount = () => {
    setTimeout(() => {
      if (this.props.project.completed !== null) {
        this.setState({ completed: this.props.project.completed });
      }
    }, 200);
  };

  componentDidUpdate = prevProps => {
    if (this.props.project !== prevProps.project) {
      this.setState({ completed: this.props.project.completed });
    }
  };

  handleToggle = event => {
    this.setState({ completed: event.target.checked }, () =>
      this.props.changeCompleted(this.state.completed, this.props.project.id)
    );
  };

  render() {
    console.log(this.props.project);
    return (
      <Grid columns="equal" centered>
        <div style={{ flex: 1 }} />
        <Checkbox
          toggle
          checked={this.state.completed}
          onChange={this.handleToggle}
          id="completed"
          style={{ marginRight: "3vw", marginTop: "2vh" }}
          label="Completed?"
        />
        <Grid.Row columns={3} centered>
          <Header id="moodboard-title">{this.props.project.title} </Header>

          <Grid.Column width={3}>
            <Comments />
          </Grid.Column>
          <Grid.Column width={9}>
            <ColorPalette />
            <MoodBoard />
          </Grid.Column>
          <Grid.Column width={4}>
            <References />
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
