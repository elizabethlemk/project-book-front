import React from "react";
import { Container, Grid, Icon, Table } from "semantic-ui-react";
import { connect } from "react-redux";

class ColorPalette extends React.Component {
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
          <Grid.Column>
            {" "}
            <Icon name="square full" size="huge" color="red" />
          </Grid.Column>
          <Grid.Column>
            {" "}
            <Icon name="square full" size="huge" color="pink" />
          </Grid.Column>
          <Grid.Column>
            {" "}
            <Icon name="square full" size="huge" color="orange" />
          </Grid.Column>
          <Grid.Column>
            {" "}
            <Icon name="square full" size="huge" color="green" />
          </Grid.Column>
          <Grid.Column>
            {" "}
            <Icon name="square full" size="huge" color="blue" />
          </Grid.Column>
          <Grid.Column>
            {" "}
            <Icon name="square full" size="huge" color="purple" />
          </Grid.Column>
          <Grid.Column>
            {" "}
            <Icon name="square full" size="huge" color="yellow" />
          </Grid.Column>
          <Grid.Column>
            {" "}
            <Icon name="square full" size="huge" color="teal" />
          </Grid.Column>
          <Grid.Column>
            {" "}
            <Icon name="square full" size="huge" color="red" />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default connect()(ColorPalette);
