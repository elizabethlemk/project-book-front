import React from "react";
import { Container, Grid, Header } from "semantic-ui-react";
import UserCard from "../components/UserCard";
import { BlogCard } from "../blog-files/BlogCard";

class Forum extends React.Component {
  state = {
    allBlogs: [],
    allUsers: []
  };

  componentDidMount = () => {
    fetch("http://localhost:4000/api/v1/users")
      .then(resp => resp.json())
      .then(json => this.setState({ allUsers: json }));

    fetch("http://localhost:4000/api/v1/blog_posts")
      .then(resp => resp.json())
      .then(json => this.setState({ allBlogs: json }));
  };

  render() {
    console.log(this.state.allBlogs);
    const { allBlogs, allUsers } = this.state;
    return (
      <Container>
        <Grid columns={2}>
          <Grid columns={2} centered>
            <Grid.Row>
              <Header>Users</Header>
            </Grid.Row>
            {allUsers.length > 0
              ? allUsers.map(user => <UserCard key={user.id} user={user} />)
              : "No Users"}
          </Grid>

          <Grid columns={2} centered>
            <Grid.Row>
              <Header>Blogs</Header>
            </Grid.Row>
            {allBlogs.length > 0
              ? allBlogs.map(blog => <BlogCard key={blog.id} blog={blog} />)
              : "No Blogs"}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Forum;
