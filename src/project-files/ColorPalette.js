import React from "react";
import Swatch from "./Swatch";
import { Button, Container, Grid, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { addColor, loadProject } from "../actions/projectAction";

class ColorPalette extends React.Component {
  handleNewSwatch = () => {
    this.props.addColor(this.props.project.id);
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
        <Grid columns={9} textAlign="center" style={{ padding: "1rem" }}>
          {this.props.colors.map(color => (
            <Swatch key={color.id} color={color} />
          ))}

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
    project: state.projectReducer.project,
    colors: state.projectReducer.colors
  };
};

export default connect(
  mapStateToProps,
  { addColor, loadProject }
)(ColorPalette);
