import React from "react";
import Swatch from "./Swatch";
import { Button, Container, Grid, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { addColor, loadProject } from "../actions/projectAction";

class ColorPalette extends React.Component {
  state = {
    colors: []
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ colors: this.props.project.colors });
    }, 300);
  };

  componentDidUpdate = prevProps => {
    if (this.props.project !== prevProps.project) {
      this.setState({ colors: this.props.project.colors });
    }
  };

  handleNewSwatch = () => {
    this.props.addColor(this.props.project.id);
    setTimeout(() => {
      this.props.loadProject(this.props.project.id);
    }, 200);
    setTimeout(() => {
      this.setState({ colors: this.props.project.colors });
    }, 300);
  };

  render() {
    return (
      <Container>
        <Table textAlign="center">
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell>Color Palette</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
        <Grid columns={9} textAlign="center">
          {this.state.colors.length > 0
            ? this.state.colors.map(color => (
                <Swatch key={color.id} color={color} />
              ))
            : null}

          <Grid.Column verticalAlign="middle">
            <Button circular icon="plus" onClick={this.handleNewSwatch} />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    project: state.projectReducer.project
  };
};

export default connect(
  mapStateToProps,
  { addColor, loadProject }
)(ColorPalette);
