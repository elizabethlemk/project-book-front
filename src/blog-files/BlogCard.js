import React from "react";
import { Grid, Item } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";

export const BlogCard = ({ blog }) => {
  return (
    <Grid.Column>
      <Item key={blog.id}>
        <Item.Content>
          <Item.Header>{blog.title}</Item.Header>
          <Item.Meta>by {blog.user}</Item.Meta>
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
