import React from "react";
import { Button, Container, Form, Grid, Image, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { addBoardImage, loadProject } from "../actions/projectAction";

class MoodBoard extends React.Component {
  state = {
    image: [],
    allImages: []
  };

  componentDidUpdate = prevProps => {
    if (this.props.images !== prevProps.images) {
      this.setState({ allImages: this.props.images });
    }
  };

  handleFile = event => {
    this.setState({
      image: event.target.files[0]
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("project[images]", this.state.image);
    this.props.addBoardImage(formData, this.props.project.id);
    this.setState({
      image: []
    });
  };

  render() {
    console.log(this.state, this.props);
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
                    multiple
                    onChange={this.handleFile}
                  />
                  <Button type="submit">Submit</Button>
                </Form>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Grid columns={2}>
          {this.props.images.map((image, index) => (
            <Grid.Column key={index}>
              <Image src={image} />
            </Grid.Column>
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
