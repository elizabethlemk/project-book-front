import React from "react";
import {
  Button,
  Container,
  Form,
  Icon,
  Label,
  Ref,
  Table
} from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MicrolinkCard from "@microlink/react";
import { connect } from "react-redux";
import { addRef } from "../actions/projectAction";

class References extends React.Component {
  state = {
    active: false,
    url: "",
    links: []
  };

  componentDidUpdate = prevProps => {
    if (this.props.links !== prevProps.links) {
      this.setState({ links: this.props.links });
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

    const links = [...this.state.links];
    const link = this.state.links[source.index];
    links.splice(source.index, 1);
    links.splice(destination.index, 0, link);
    // This saves the order of the comments in the array
    this.setState({ links: links });
  };

  handleShow = () => {
    // handles if the form will show in the table or not
    this.setState({ active: !this.state.active });
  };

  handleClick = () => {
    console.log("hi");
  };

  handleChange = event => {
    this.setState({ url: event.target.value });
  };

  handleSubmit = () => {
    const linkObj = {
      project_id: this.props.project.id,
      url: this.state.url
    };
    this.props.addRef(this.props.project.id, linkObj);
    this.setState({ url: "", active: false });
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Table textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>References</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Droppable droppableId="tableBody">
            {(provided, snapshot) => (
              <Ref innerRef={provided.innerRef}>
                <Table.Body {...provided.droppableProps}>
                  {this.state.links.length > 0
                    ? this.state.links.map((link, index) => (
                        <Draggable
                          draggableId={link.id}
                          index={index}
                          key={link.id}
                        >
                          {(provided, snapshot) => (
                            <Ref innerRef={provided.innerRef}>
                              <Table.Row
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Table.Cell>
                                  <MicrolinkCard url={link.url} />
                                </Table.Cell>
                              </Table.Row>
                            </Ref>
                          )}
                        </Draggable>
                      ))
                    : null}

                  {provided.placeholder}

                  {this.state.active ? (
                    <Table.Row>
                      <Table.Cell>
                        <Form onSubmit={this.handleSubmit}>
                          <Form.Input
                            placeholder="Paste a URL here!"
                            value={this.state.url}
                            onChange={this.handleChange}
                          />
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
    links: state.projectReducer.links
  };
};

export default connect(
  mapStateToProps,
  { addRef }
)(References);
