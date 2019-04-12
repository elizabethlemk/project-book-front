import React from "react";
import BlogForm from "../blog-files/BlogForm";
import { UserBlogCard } from "../blog-files/BlogCard";
import { Button, Container, Item, Placeholder } from "semantic-ui-react";
import { connect } from "react-redux";
import { loadBlogs } from "../actions/blogAction";

class Blogs extends React.Component {
  state = {
    active: false
  };

  componentDidMount = () => {
    this.props.loadBlogs(this.props.user.id);
  };

  handleClick = () => {
    this.setState({ active: !this.state.active });
  };

  render() {
    return (
      <Container style={{ marginTop: "4vh" }}>
        {this.state.active ? (
          <Button circular icon="x" onClick={this.handleClick} size="huge" />
        ) : (
          <div>
            <Button
              circular
              icon="plus"
              onClick={this.handleClick}
              size="huge"
            />
            Add a new blog post
          </div>
        )}

        {this.state.active ? <BlogForm /> : null}
        <Item.Group divided style={{ marginTop: "6vh" }}>
          {this.props.blogs.length > 0 ? (
            this.props.blogs.map(blog => (
              <UserBlogCard key={blog.id} blog={blog} />
            ))
          ) : (
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
          )}
        </Item.Group>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    blogs: state.blogReducer.blogs
  };
};

export default connect(
  mapStateToProps,
  { loadBlogs }
)(Blogs);
