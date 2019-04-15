import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Grid } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";

export const BlogCard = ({ blog }) => {
  return (
    <Grid.Row>
      <Card key={blog.id} style={{ width: "30vw" }}>
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
  return (
    <Card key={blog.id} fluid>
      <Card.Content>
        <Card.Header>{blog.title}</Card.Header>
        <Card.Meta>Posted on {blog.created_at}</Card.Meta>
        {ReactHtmlParser(blog.content)}
      </Card.Content>
    </Card>
  );
};
