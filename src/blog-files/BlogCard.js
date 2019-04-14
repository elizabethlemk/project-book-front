import React from "react";
import { Grid, Item } from "semantic-ui-react";

export const BlogCard = ({ blog }) => {
  console.log(blog.content.replace(/(^")|("$)/g, ""));
  return (
    <Grid.Column>
      <Item key={blog.id}>
        <Item.Content>
          <Item.Header>{blog.title}</Item.Header>
          <Item.Meta>by {blog.user}</Item.Meta>
          <Item.Meta>Posted on {blog.created_at}</Item.Meta>
          {blog.content.replace(/\"/g, "")}
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
        {blog.content.replace(/\"/g, "")}
      </Item.Content>
    </Item>
  );
};
