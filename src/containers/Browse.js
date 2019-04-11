import React from "react";
import { Container, Grid } from "semantic-ui-react";
import UserCard from "../components/UserCard";
import BlogCard from "../components/BlogCard";

class Forum extends React.Component {
  render() {
    return (
      <Container>
        <Grid columns={2}>
          <Grid columns={2}>
            <UserCard />
            <UserCard />
            <UserCard />
          </Grid>

          <Grid columns={3}>
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Forum;
