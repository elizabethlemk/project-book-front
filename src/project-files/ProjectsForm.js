import React from "react";
import MoodBoard from "./MoodBoard";
import Comments from "./Comments";
import ColorPalette from "./ColorPalette";
import References from "./References";
import { Checkbox, Container, Grid, Header, Item } from "semantic-ui-react";
import { connect } from "react-redux";

class ProjectsForm extends React.Component {
  render() {
    return (
      <Grid columns="equal" centered>
        <div style={{ flex: 1 }} />
        <Checkbox
          toggle
          id="completed"
          style={{ marginRight: "3vw", marginTop: "2vh" }}
          label="Completed?"
        />
        <Grid.Row columns={3} centered>
          <Header className="moodboard-title">
            {this.props.project.title}{" "}
          </Header>

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

export default connect(mapStateToProps)(ProjectsForm);
