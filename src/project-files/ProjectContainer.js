import React from "react";
import MicrolinkCard from "@microlink/react";
import ProgressiveImage from "react-progressive-image-loading";
import { Container, Grid, Header, Image, Table } from "semantic-ui-react";
import Loaders from "../components/Loaders";

const Comments = ({ comments }) => {
  return (
    <Table textAlign="center">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Notes</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {comments.map(comment => (
          <Table.Row key={comment.id}>
            <Table.Cell>{comment.comment}</Table.Cell>
          </Table.Row>
        ))}
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
        {colors.map(color => (
          <Grid.Column key={color.id}>
            <div id="swatch">
              <div
                id="swatch-color"
                style={{ backgroundColor: color.color_hex }}
              />
            </div>
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  );
};

const MoodBoard = ({ images }) => {
  return (
    <Grid columns={3}>
      {images.map(image => (
        <ProgressiveImage
          key={image.id}
          render={() => (
            <Grid.Column key={image.id}>
              <Image src={image.img_url} />
            </Grid.Column>
          )}
        />
      ))}
    </Grid>
  );
};

const References = ({ links }) => {
  return (
    <Table textAlign="center">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>References</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {links.map(link => (
          <Table.Row>
            <Table.Cell>
              <MicrolinkCard url={link.url} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export const ProjectContainer = ({ project }) => {
  console.log(project);
  return (
    <Container style={{ paddingTop: "2rem" }}>
      <Grid>
        <Grid.Row columns={3} centered>
          <Header id="moodboard-title">{project.title} </Header>

          <Grid.Column width={3} textAlign="center">
            <React.Suspense fallback={<Loaders />}>
              <Comments comments={project.notes} />
            </React.Suspense>
          </Grid.Column>
          <Grid.Column width={9} textAlign="center">
            <React.Suspense fallback={<Loaders />}>
              <ColorPalette colors={project.colors} />
              <MoodBoard images={project.images} />
            </React.Suspense>
          </Grid.Column>
          <Grid.Column width={4} textAlign="center">
            <React.Suspense fallback={<Loaders />}>
              <References links={project.links} />
            </React.Suspense>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
