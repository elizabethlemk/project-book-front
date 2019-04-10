import React from "react";
import MoodBoard from "./MoodBoard";
import Comments from "./Comments";
import References from "./References";
import { Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";

class ProjectsForm extends React.Component {
  handleDelete = () => {
    console.log("delete this shit");
  };

  render() {
    return (
      <Grid columns="equal" centered>
        <Grid.Row columns={3} centered>
          <Header className="moodboard-title">
            {" "}
            {this.props.project.title}{" "}
          </Header>
          <Grid.Column width={4}>
            <Comments />
          </Grid.Column>
          <Grid.Column width={7}>
            <MoodBoard />{" "}
          </Grid.Column>
          <Grid.Column width={5}>
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
