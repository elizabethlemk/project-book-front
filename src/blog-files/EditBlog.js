import React from "react";
import { Button, Form } from "semantic-ui-react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from "react-redux";
import { updateBlog } from "../actions/blogAction";

class EditBlog extends React.Component {
  state = {
    title: this.props.blog.title,
    content: this.props.blog.content
  };

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = () => {
    this.props.updateBlog(this.state, this.props.blog.id);
    this.setState({
      title: "",
      content: "Write here about anything you want!"
    });
    this.props.handleHideEdit();
  };

  render() {
    console.log(this.props);
    const { title, content } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          label="Title"
          value={title}
          name="title"
          placeholder="Title of your blog post goes here!"
        />

        <CKEditor
          editor={ClassicEditor}
          data={content}
          config={{
            toolbar: [
              "bold",
              "italic",
              "link",
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
        <Button type="submit" style={{ marginTop: "1rem" }}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default connect(
  null,
  { updateBlog }
)(EditBlog);
