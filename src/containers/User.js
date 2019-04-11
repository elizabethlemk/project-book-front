import React from "react";
import {
  Card,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Segment
} from "semantic-ui-react";

import { connect } from "react-redux";

class User extends React.Component {
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
      <Container id="user-container">
        {Object.keys(this.props.user).length > 0 ? (
          <Grid columns={3} centered>
            <Grid.Column>
              <Card>
                <Image id="user-image" src={image} />
                <Card.Content>
                  <Card.Header textAlign="center" id="username">
                    {username}
                  </Card.Header>
                  <Card.Description>
                    <Icon name="user" />
                    {first_name} {last_name}
                  </Card.Description>
                  <Card.Meta>
                    <span className="date">
                      <Icon name="birthday" />
                      {birthday}
                    </span>
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <Icon name="mail" />
                  {email}
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
              {blog_posts.length > 0 ? (
                <Segment>
                  <Header>Blogs: </Header>
                  <List divided>
                    {this.props.user.blog_posts.map(blog => (
                      <List.Item key={blog.id}>{blog.title}</List.Item>
                    ))}
                  </List>
                </Segment>
              ) : (
                "No blogs!"
              )}

              {projects.length > 0 ? (
                <Segment>
                  <Header>Projects: </Header>
                  <List divided>
                    {this.props.user.projects.map(project => (
                      <List.Item key={project.id}>{project.title}</List.Item>
                    ))}
                  </List>
                </Segment>
              ) : (
                "No projects!"
              )}
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
