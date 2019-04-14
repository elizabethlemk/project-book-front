import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from "react-redux";
import { addBlog, loadBlogs } from "../actions/blogAction";

class BlogForm extends React.Component {
  state = {
    user_id: this.props.user.id,
    title: "",
    content: "Write here about anything you want!"
  };

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = () => {
    this.props.addBlog(this.state);
    this.setState({
      title: "",
      content: "Write here about anything you want!"
    });
    this.props.loadBlogs(this.props.user.id);
  };

  render() {
    const { title, content } = this.state;
    return (
      <Segment textAlign="center">
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Title"
            value={title}
            name="title"
            placeholder="Title of your blog post goes here!"
            onChange={this.handleChange}
          />

          <CKEditor
            editor={ClassicEditor}
            data={content}
            config={{
              removePlugins: ["Heading", "Link"],
              toolbar: [
                "bold",
                "italic",
                "bulletedList",
                "numberedList",
                "blockQuote",
                "mediaEmbed"
              ]
            }}
            onInit={editor => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              this.setState({ content: data });
              console.log({ event, editor, data });
            }}
            onBlur={editor => {
              console.log("Blur.", editor);
            }}
            onFocus={editor => {
              console.log("Focus.", editor);
            }}
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
