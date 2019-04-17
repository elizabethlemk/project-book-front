import React from "react";
import { Container, Grid, Header, Visibility } from "semantic-ui-react";
import TextLoop from "react-text-loop";

class Home extends React.Component {
  render() {
    return (
      <Visibility>
        <Container fluid id="splash">
          <Grid centered columns={3}>
            <Grid.Row centered rows={3}>
              <Header as="h1" inverted id="quote">
                A place for all your{" "}
                <TextLoop interval={1000}>
                  <span>ideas</span>
                  <span>projects</span>
                  <span>inspirations</span>
                  <span>notes</span>
                </TextLoop>
              </Header>
              <Header inverted id="lizzy">
                Website created by{" "}
                <a href="https://github.com/elizabethlemk">Elizabeth Le</a>
              </Header>
            </Grid.Row>
          </Grid>
        </Container>
      </Visibility>
    );
  }
}

export default Home;
