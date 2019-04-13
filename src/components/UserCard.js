import React from "react";
import { Card, Grid, Segment } from "semantic-ui-react";
import { UserBlogCard } from "../blog-files/BlogCard";

export const UserCard = ({ user }) => {
  return (
    <Grid.Column>
      <Card
        image={user.image}
        header={user.username}
        meta={`${user.first_name} ${user.last_name}`}
      />
    </Grid.Column>
  );
};

export const UserBlogs = ({ user }) => {
  return (
    <Segment>
      {user.blogs.map(blog => (
        <UserBlogCard blog={blog} />
      ))}
    </Segment>
  );
};
