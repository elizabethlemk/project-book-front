import React from "react";
import { Checkbox, Grid, Header } from "semantic-ui-react";
import Loaders from "../components/Loaders";
import { connect } from "react-redux";
import { changeCompleted } from "../actions/projectAction";

const MoodBoard = React.lazy(() => import("./MoodBoard"));
const Comments = React.lazy(() => import("./Comments"));
const ColorPalette = React.lazy(() => import("./ColorPalette"));
const References = React.lazy(() => import("./References"));

class ProjectsForm extends React.Component {
  handleToggle = event => {
    this.props.changeCompleted(
      this.props.project.completed,
      this.props.project.id
    );
  };

  render() {
    console.log(this.props.project);
    return (
      <Grid columns="equal" centered>
        <div style={{ flex: 1 }} />
        <Checkbox
          toggle
          checked={this.props.project.completed}
          onChange={this.handleToggle}
          id="completed"
          style={{ marginRight: "3vw", marginTop: "2vh" }}
          label="Completed?"
        />
        <Grid.Row columns={3} centered>
          <Header id="moodboard-title">{this.props.project.title} </Header>

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
