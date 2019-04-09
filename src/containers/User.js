import React from "react";
import { Container, Grid } from "semantic-ui-react";

import { connect } from "react-redux";

class User extends React.Component {
  renderProjects = () => {
    return (
      <ul>
        {this.props.user.projects.map(project => (
          <li>{project.title}</li>
        ))}
      </ul>
    );
  };

  render() {
    const {
      username,
      first_name,
      last_name,
      birthday,
      email,
      image,
      projects,
      blog_posts
    } = this.props.user;
    console.log(this.props.user);
    return (
      <Container>
        {Object.keys(this.props.user).length > 0 ? (
          <Grid centered columns={3}>
            <Grid.Column centered>
              <Grid.Row>{username}</Grid.Row>
              <Grid.Row>
                <img
                  src={image.image_url}
                  alt="profile img"
                  className="profile-img"
                />
              </Grid.Row>
              <Grid.Row>
                Name: {first_name} {last_name}
              </Grid.Row>
              <Grid.Row>Email: {email}</Grid.Row>
              <Grid.Row>Birthday: {birthday}</Grid.Row>
            </Grid.Column>
            <Grid.Column centered>
              <Grid.Row>
                {blog_posts.length > 0 ? "Blogs go here" : "No blogs!"}
              </Grid.Row>
              <Grid.Row>
                {projects.length > 0 ? this.renderProjects : "No projects!"}
              </Grid.Row>
            </Grid.Column>
          </Grid>
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.userReducer.user };
};

export default connect(mapStateToProps)(User);
