import React from "react";
import { Form, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { addBoardImage } from "../actions/projectAction";

class MoodBoard extends React.Component {
  state = {
    image: null
  };

  handleFile = event => {
    this.setState({
      image: event.target.files[0]
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("project[images]", event.target.files[0]);
    this.props.addBoardImage(formData, this.props.project.id);
    // this.setState({
    //   image: null
    // });
  };

  render() {
    console.log(this.state, this.props);
    return (
      <Grid.Row centered>
        <Header as="h2">Mood Board </Header>
        <Form.Input
          type="file"
          name="image"
          multiple
          onChange={this.handleSubmit}
        />
      </Grid.Row>
    );
  }
}

const mapStateToProps = state => {
  return { project: state.projectReducer.project };
};

export default connect(
  mapStateToProps,
  { addBoardImage }
)(MoodBoard);
