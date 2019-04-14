import React from "react";
import { Checkbox, Grid, Header } from "semantic-ui-react";
import Loaders from "../components/Loaders";
import Crabs from "../components/Crabs";

const Comments = props => {
  return <div>Project COmments</div>;
};

const ColorPalette = props => {
  return <div>Project ColorPalette</div>;
};

const MoodBoard = props => {
  return <div>Project MoodBoard</div>;
};

const References = props => {
  return <div>Project References</div>;
};

export const ProjectContainer = () => {
  return (
    <Grid columns="equal" centered style={{ zIndex: "2" }}>
      {this.props.project.title === "Crab Party" ? <Crabs /> : null}

      <Grid.Row columns={3} centered>
        <Header id="moodboard-title">{this.props.project.title} </Header>

        <Grid.Column width={3}>
          <React.Suspense fallback={<Loaders />}>
            <Comments />
          </React.Suspense>
        </Grid.Column>
        <Grid.Column width={9}>
          <React.Suspense fallback={<Loaders />}>
            <ColorPalette />
            <MoodBoard />
          </React.Suspense>
        </Grid.Column>
        <Grid.Column width={4}>
          <React.Suspense fallback={<Loaders />}>
            <References />
          </React.Suspense>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
