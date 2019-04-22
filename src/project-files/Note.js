import React from "react";
import { Icon, Ref, Table } from "semantic-ui-react";
import { Draggable } from "react-beautiful-dnd";

const Note = ({ note, index, removeItem }) => {
  return (
    <Draggable draggableId={note.id} index={index}>
      {(provided, snapshot) => (
        <Ref innerRef={provided.innerRef}>
          <Table.Row {...provided.draggableProps} {...provided.dragHandleProps}>
            <Table.Cell>
              {note.comment}
              <Icon
                name="close"
                size="small"
                color="grey"
                style={{
                  padding: "0",
                  float: "right",
                  marginLeft: ".5rem",
                  marginTop: ".4rem"
                }}
                onClick={() => removeItem(index, note.id)}
              />
            </Table.Cell>
          </Table.Row>
        </Ref>
      )}
    </Draggable>
  );
};
export default Note;
