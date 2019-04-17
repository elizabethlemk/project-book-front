import React from "react";
import {
  Card,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment
} from "semantic-ui-react";

class User extends React.Component {
  state = { activeItem: "blogs" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    console.log(this.props.user);
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
    const showStuff = () => {
      if (activeItem === "blogs") {
        return (
          <Segment>
            <Header>Blogs: </Header>
            {blog_posts.length > 0 ? (
              <List divided>
                {this.props.user.blog_posts.map(blog => (
                  <List.Item key={blog.id}>{blog.title}</List.Item>
                ))}
              </List>
            ) : (
              "No blogs!"
            )}
          </Segment>
        );
      } else if (activeItem === "projects") {
        return (
          <Segment>
            <Header>Projects: </Header>
            {projects.length > 0 ? (
              <List divided>
                {this.props.user.projects.map(project => (
                  <List.Item key={project.id}>{project.title}</List.Item>
                ))}
              </List>
            ) : (
              "No projects!"
            )}
          </Segment>
        );
      }
    };
    return (
      <Container id="user-container" fluid style={{ padding: "5vw" }}>
        {Object.keys(this.props.user).length > 0 ? (
          <Grid columns={2} centered>
            <Grid.Column width={4}>
              <Card fluid>
                <Image id="user-image" src={image} />
                <Card.Content textAlign="center">
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
                <Card.Content extra textAlign="center">
                  <Icon name="mail" />
                  {email}
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column stretched width={10} textAlign="center">
              {showStuff()}
            </Grid.Column>

            <Grid.Column width={2}>
              <Menu fluid vertical tabular="right">
                <Menu.Item
                  name="blogs"
                  active={activeItem === "blogs"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="projects"
                  active={activeItem === "projects"}
                  onClick={this.handleItemClick}
                />
              </Menu>
            </Grid.Column>
          </Grid>
        ) : null}
      </Container>
    );
  }
}

export default User;
