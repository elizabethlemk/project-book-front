import React from "react";
import { Container, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { UserCard } from "../components/UserCard";
import { BlogCard } from "../blog-files/BlogCard";
import { ProjectContainer } from "./ProjectContainer";

class UserContainer extends React.Component {
  state = {
    user: null
  };

  componentDidMount = () => {
    const username = this.props.location.split("/")[2];
    const selectedUser = this.props.allUsers.filter(
      users => users.username === username
    );
    this.setState({ user: selectedUser[0] });
  };

  componentDidUpdate = prevProps => {
    if (this.props.allUsers !== prevProps.allUsers) {
      const username = this.props.location.split("/")[2];
      const selectedUser = this.props.allUsers.filter(
        users => users.username === username
      );
      this.setState({ user: selectedUser[0] });
    }
  };

  render() {
    console.log(this.props.location.split("/")[2], this.props.allUsers);
    console.log(this.state);
    return (
      <Container
        textAlign="center"
        fluid
        style={{ marginTop: "5vh", padding: "5rem" }}
      >
        <Grid columns={3}>
          <Grid.Column width={3}>
            {this.state.user ? <UserCard user={this.state.user} /> : null}
          </Grid.Column>
          <Grid.Column width={4}>
            {this.state.user
              ? this.state.user.blog_posts.map(blog => (
                  <Grid.Row style={{ paddingBottom: "1rem" }}>
                    <BlogCard blog={blog} />
                  </Grid.Row>
                ))
              : null}
          </Grid.Column>
          <Grid.Column width={9}>
            {this.state.user ? <ProjectContainer /> : null}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    allUsers: state.userReducer.allUsers
  };
};
export default connect(mapStateToProps)(UserContainer);
