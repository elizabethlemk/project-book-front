import React from "react";
import ImageCard from "./ImageCard";
import { Button, Container, Form, Grid, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { addBoardImage, loadProject } from "../actions/projectAction";

class MoodBoard extends React.Component {
  state = {
    image: []
  };

  handleFile = event => {
    this.setState({
      image: event.target.files[0]
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    event.target.children[0].firstElementChild.firstElementChild.value = null;
    const formData = new FormData();
    formData.append("project[images]", this.state.image);
    this.props.addBoardImage(formData, this.props.project.id);
    // this.props.loadProject(this.props.project.id);
    this.setState({
      image: []
    });

    console.log("submitted");
  };

  render() {
    return (
      <Container id="moodboard-container">
        <Table textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Mood Board</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Input
                    type="file"
                    name="image"
                    onChange={this.handleFile}
                  />
                  <Button type="submit">Submit</Button>
                </Form>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Grid columns={3}>
          {this.props.images.map(image => (
            <ImageCard
              image={image}
              projectId={this.props.project.id}
              key={image.id}
            />
          ))}
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    project: state.projectReducer.project,
    images: state.projectReducer.images
  };
};

export default connect(
  mapStateToProps,
  { addBoardImage, loadProject }
)(MoodBoard);
