import React from "react";
import { Container, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";

import { UserCard } from "../components/UserCard";
import { BlogCard } from "../blog-files/BlogCard";
import Loaders from "../components/Loaders";

class Forum extends React.Component {
  render() {
    const { allBlogs, allUsers } = this.props;
    return (
      <Container>
        <Grid columns={2}>
          <Grid columns={2} centered>
            <Grid.Row>
              <Header>Users</Header>
            </Grid.Row>
            {allUsers.length > 0 ? (
              allUsers.map(user => <UserCard key={user.id} user={user} />)
            ) : (
              <Loaders />
            )}
          </Grid>
          <Grid centered columns={1}>
            <Grid.Row>
              <Header>Blogs</Header>
            </Grid.Row>
            {allBlogs.length > 0 ? (
              allBlogs.map(blog => <BlogCard key={blog.id} blog={blog} />)
            ) : (
              <Loaders />
            )}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    allUsers: state.userReducer.allUsers,
    allBlogs: state.userReducer.allBlogs
  };
};

export default connect(mapStateToProps)(Forum);
