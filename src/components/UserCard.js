import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Container, Header, Icon, Image } from "semantic-ui-react";
import { UserBlogCard } from "../blog-files/BlogCard";

export const UserCard = ({ user }) => {
  return (
    <Card style={{ width: "auto" }}>
      <Card.Content textAlign="center">
        <Image id="user-image" src={user.image} />
        <Card.Header
          style={{ marginTop: "1rem" }}
          as={NavLink}
          to={`/users/${user.username}`}
        >
          {user.username}
        </Card.Header>
        <Card.Description>
          <Icon name="user" />
          {user.first_name} {user.last_name}
        </Card.Description>
        <Card.Meta>
          <Icon name="pin" />
          {user.projects.length} Projects
        </Card.Meta>
        <Card.Meta>
          <Icon name="book" />
          {user.blog_posts.length} Blogs
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

export const UserBlogs = ({ user }) => {
  return (
    <Container>
      <Header>Blogs </Header>
      {user.blog_posts.map(blog => (
        <UserBlogCard blog={blog} />
      ))}
    </Container>
  );
};
