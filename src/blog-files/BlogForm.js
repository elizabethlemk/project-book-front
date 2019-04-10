import React from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { addBlog, loadBlogs } from "../actions/blogAction";

class BlogForm extends React.Component {
  state = {
    user_id: this.props.user.id,
    title: "",
    content: ""
  };

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = () => {
    console.log(this.state);
    this.props.addBlog(this.state);
    this.setState({ title: "", content: "" });
    this.props.loadBlogs(this.state.user_id);
  };

  render() {
    const { content, title } = this.state;
    return (
      <Segment textAlign="center">
        <Form onSubmit={this.handleSubmit}>
          <Header as="h2">New Blog Post</Header>
          <Form.Input
            label="Title"
            value={title}
            name="title"
            placeholder="Title of your blog post goes here!"
            onChange={this.handleChange}
          />
          <Form.TextArea
            label="Content"
            value={content}
            name="content"
            placeholder="This is where I talk about things like my project or a technique I used."
            onChange={this.handleChange}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.userReducer.user };
};

export default connect(
  mapStateToProps,
  { addBlog, loadBlogs }
)(BlogForm);
