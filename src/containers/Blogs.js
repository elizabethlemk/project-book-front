import React from "react";
import BlogForm from "../blog-files/BlogForm";
import { Button, Container, Item } from "semantic-ui-react";
import { connect } from "react-redux";
import { loadBlogs } from "../actions/blogAction";

class Blogs extends React.Component {
  state = {
    blog_posts: [],
    active: false
  };

  componentDidMount = () => {
    this.props.loadBlogs(this.props.user.id);
    this.setState({ blog_posts: this.props.blogs });
  };

  componentDidUpdate = prevProps => {
    if (this.props.blogs !== prevProps.blogs) {
      this.setState({ blog_posts: this.props.blogs });
    }
  };

  handleClick = () => {
    this.setState({ active: !this.state.active });
  };

  render() {
    return (
      <Container>
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
        <Item.Group divided>
          {this.state.blog_posts.length > 0
            ? this.state.blog_posts.map(blog => (
                <Item key={blog.id}>
                  <Item.Content>
                    <Item.Header>{blog.title}</Item.Header>
                    <Item.Meta>Posted on: {blog.created_at}</Item.Meta>
                    <Item.Description>{blog.content}</Item.Description>
                  </Item.Content>
                </Item>
              ))
            : null}
        </Item.Group>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.userReducer.user, blogs: state.blogReducer.blogs };
};

export default connect(
  mapStateToProps,
  { loadBlogs }
)(Blogs);
