import React from "react";
import { Button, Form, Icon, Ref, Table } from "semantic-ui-react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Note from "./Note";
import { connect } from "react-redux";
import { addComment, removeNote } from "../actions/projectAction";

class Comments extends React.Component {
  state = {
    active: false,
    comment: null,
    notes: []
  };

  componentDidUpdate = prevProps => {
    if (this.props.comments !== prevProps.comments) {
      this.setState({ notes: this.props.comments });
    }
  };

  onDragEnd = result => {
    // Does the dragging magic. Result is an object created by DND
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const notes = [...this.state.notes];
    const note = this.state.notes[source.index];
    notes.splice(source.index, 1);
    notes.splice(destination.index, 0, note);
    // This saves the order of the comments in the array
    this.setState({ notes: notes });
  };

  handleShow = () => {
    // handles if the form will show in the table or not
    this.setState({ active: !this.state.active });
  };

  handleChange = event => {
    this.setState({ comment: event.target.value });
  };

  handleSubmit = () => {
    const commentObj = {
      user_id: this.props.user.id,
      project_id: this.props.project.id,
      type_name: "note",
      comment: this.state.comment
    };
    this.props.addComment(commentObj);
    this.setState({ comment: "", active: false });
  };

  removeItem = (index, id) => {
    const newArr = this.state.notes.slice(1, index);
    this.props.removeNote(id);
    this.setState({ notes: newArr });
  };

  render() {
    console.log(this.state.notes);
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Table textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Notes</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {
            // Displays the current comment for the project
            // These are draggable components
          }

          <Droppable droppableId="tableBody">
            {(provided, snapshot) => (
              <Ref innerRef={provided.innerRef}>
                <Table.Body {...provided.droppableProps}>
                  {this.state.notes.length > 0
                    ? this.state.notes.map((note, index) => (
                        <Note
                          index={index}
                          note={note}
                          key={index}
                          removeItem={this.removeItem}
                        />
                      ))
                    : null}
                  {provided.placeholder}

                  {
                    //Logic for the add button and comment form below//
                  }

                  {this.state.active ? (
                    <Table.Row>
                      <Table.Cell>
                        <Form onSubmit={this.handleSubmit}>
                          <Form.Input onChange={this.handleChange} />
                          <Button type="submit">Submit</Button>
                        </Form>
                      </Table.Cell>
                    </Table.Row>
                  ) : null}
                  <Table.Row>
                    <Table.Cell>
                      <Button animated onClick={this.handleShow}>
                        {this.state.active ? (
                          <Button.Content visible>
                            <Icon name="x" />
                          </Button.Content>
                        ) : (
                          <Button.Content visible>
                            <Icon name="plus" />
                          </Button.Content>
                        )}
                        <Button.Content hidden>
                          {this.state.active ? "Cancel" : "Add"}
                        </Button.Content>
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Ref>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    project: state.projectReducer.project,
    comments: state.projectReducer.comments
  };
};

export default connect(
  mapStateToProps,
  { addComment, removeNote }
)(Comments);
