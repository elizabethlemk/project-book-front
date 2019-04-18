import React from "react";
import { Card, Container, Grid, Icon, Image, Menu } from "semantic-ui-react";
import { BlogCard } from "../blog-files/BlogCard";
import ProjectTabs from "../project-files/ProjectTabs";

class User extends React.Component {
  state = { activeItem: "projects" };

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
        return blog_posts.length > 0
          ? this.props.user.blog_posts.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))
          : "No blogs!";
      } else if (activeItem === "projects") {
        return projects.length > 0 ? (
          <ProjectTabs projects={projects} />
        ) : (
          "No projects!"
        );
      }
    };
    return (
      <Container id="user-container" fluid style={{ padding: "3vw" }}>
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
                  name="projects"
                  active={activeItem === "projects"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="blogs"
                  active={activeItem === "blogs"}
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
