import React from "react";
import { Container, Grid, Header, Visibility } from "semantic-ui-react";

class Home extends React.Component {
  render() {
    return (
      <Visibility>
        <Container fluid id="splash">
          <Grid centered columns={3}>
            <Grid.Row centered rows={3}>
              <Header as="h1" inverted id="quote">
                A place for all your ideas, inspiration, and notes{" "}
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
