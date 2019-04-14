import React from "react";
import { NavLink } from "react-router-dom";
import { Grid, Item } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";

export const BlogCard = ({ blog }) => {
  return (
    <Grid.Column>
      <Item key={blog.id}>
        <Item.Content>
          <Item.Header>{blog.title}</Item.Header>
          <Item.Meta>
            by <NavLink to={`/users/${blog.user}`}>{blog.user}</NavLink>
          </Item.Meta>
          <Item.Meta>Posted on {blog.created_at}</Item.Meta>
          {ReactHtmlParser(blog.content)}
        </Item.Content>
      </Item>
    </Grid.Column>
  );
};

export const UserBlogCard = ({ blog }) => {
  return (
    <Item key={blog.id}>
      <Item.Content>
        <Item.Header>{blog.title}</Item.Header>
        <Item.Meta>Posted on {blog.created_at}</Item.Meta>
        {ReactHtmlParser(blog.content)}
      </Item.Content>
    </Item>
  );
};
