import React from "react";
import { Container, Grid, Header, Table } from "semantic-ui-react";
import Loaders from "../components/Loaders";
import Crabs from "../components/Crabs";

const Comments = ({ comments }) => {
  return (
    <Table textAlign="center">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Notes</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          // comments.map(comment =>
          // <Table.Row><Table.Cell>
          // {comment}
          // </Table.Cell></Table.Row>
          // )
        }
      </Table.Body>
    </Table>
  );
};

const ColorPalette = ({ colors }) => {
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
        {
          //   colors.map(color => (
          //   <Swatch key={color.id} color={color} />
          // ))
        }
      </Grid>
    </Container>
  );
};

const MoodBoard = props => {
  return <div>Project MoodBoard</div>;
};

const References = props => {
  return <div>Project References</div>;
};

export const ProjectContainer = ({ project }) => {
  return (
    <Container style={{ padding: "2rem" }}>
      <Grid>
        {
          // this.props.project.title === "Crab Party" ? <Crabs /> : null
        }

        <Grid.Row columns={3} centered>
          <Header id="moodboard-title">
            {
              // this.props.project.title
            }{" "}
            Title
          </Header>

          <Grid.Column width={3} textAlign="center">
            <React.Suspense fallback={<Loaders />}>
              <Comments />
            </React.Suspense>
          </Grid.Column>
          <Grid.Column width={9} textAlign="center">
            <React.Suspense fallback={<Loaders />}>
              <ColorPalette />
              <MoodBoard />
            </React.Suspense>
          </Grid.Column>
          <Grid.Column width={4} textAlign="center">
            <React.Suspense fallback={<Loaders />}>
              <References />
            </React.Suspense>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
