import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Dropdown, Grid, Placeholder } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";

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

export const UserBlogCard = ({ blog }) => {
  const handleEdit = () => {
    console.log("edit blog");
  };
  const handleDelete = () => {
    console.log("delete blog");
  };
  return (
    <Card key={blog.id} fluid>
      <Card.Content>
        <Dropdown item icon="setting" pointing="right" style={{ left: "98%" }}>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleEdit()}>
              Edit Blog
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleDelete()}>
              Delete Blog
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Card.Header>{blog.title}</Card.Header>
        <Card.Meta>Posted on {blog.created_at}</Card.Meta>
        {ReactHtmlParser(blog.content)}
      </Card.Content>
    </Card>
  );
};
