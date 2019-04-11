import React from "react";
import BlogForm from "../blog-files/BlogForm";
import { UserBlogCard } from "../blog-files/BlogCard";
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
    setTimeout(() => {
      this.setState({ blog_posts: this.props.blogs });
    }, 300);
  };

  componentDidUpdate = prevProps => {
    if (this.props.user.blog_posts !== prevProps.user.blog_posts) {
      this.props.loadBlogs(this.props.user.id);
      setTimeout(() => {
        this.setState({ blog_posts: this.props.blogs });
      }, 300);
    }
  };

  handleClick = () => {
    this.setState({ active: !this.state.active });
  };

  render() {
    console.log(this.props);
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
          {this.state.blog_posts.length > 0
            ? this.state.blog_posts.map(blog => (
                <UserBlogCard key={blog.id} blog={blog} />
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
