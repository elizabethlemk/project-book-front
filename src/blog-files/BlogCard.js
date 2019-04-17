import React from "react";
import { NavLink } from "react-router-dom";
import {
  Card,
  Container,
  Dropdown,
  Grid,
  Placeholder
} from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";

import EditBlog from "../blog-files/EditBlog";

export const BlogPlaceholder = () => {
  return (
    <Placeholder fluid>
      <Placeholder.Header image>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Header>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
    </Placeholder>
  );
};

export const BlogCard = ({ blog }) => {
  return (
    <Grid.Row>
      <Card key={blog.id} fluid>
        <Card.Content>
          <Card.Header>{blog.title}</Card.Header>
          <Card.Meta>
            by <NavLink to={`/users/${blog.user}`}>{blog.user}</NavLink>
          </Card.Meta>
          <Card.Meta>Posted on {blog.created_at}</Card.Meta>
          <Card.Description textAlign="left">
            {ReactHtmlParser(blog.content)}
          </Card.Description>
        </Card.Content>
      </Card>
    </Grid.Row>
  );
};

export class UserBlogCard extends React.Component {
  state = {
    active: false
  };

  handleShowEdit = () => {
    this.setState({ active: true });
  };
  handleHideEdit = () => {
    this.setState({ active: false });
  };

  handleDelete = () => {
    const { blog, removeUserBlog, deleteBlog } = this.props;
    removeUserBlog(blog.id);
    deleteBlog(blog.id);
  };

  render() {
    const { blog } = this.props;
    console.log(this.state);
    return (
      <Card key={blog.id} fluid>
        <Card.Content textAlign="center">
          <Dropdown
            item
            icon="setting"
            pointing="right"
            style={{ left: "50%" }}
          >
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.handleShowEdit}>
                Edit Blog
              </Dropdown.Item>
              <Dropdown.Item onClick={this.handleDelete}>
                Delete Blog
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {this.state.active ? (
            <EditBlog handleHideEdit={this.handleHideEdit} blog={blog} />
          ) : (
            <Container fluid>
              <Card.Header>{blog.title}</Card.Header>
              <Card.Meta>Posted on {blog.updated_at}</Card.Meta>
              <Card.Description>
                {ReactHtmlParser(blog.content)}
              </Card.Description>
            </Container>
          )}
        </Card.Content>
      </Card>
    );
  }
}
