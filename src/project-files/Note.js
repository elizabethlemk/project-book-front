import React from "react";
import { Button, Ref, Table } from "semantic-ui-react";
import { Draggable } from "react-beautiful-dnd";

const Note = ({ note, index, removeItem }) => {
  return (
    <Draggable draggableId={note.id} index={index}>
      {(provided, snapshot) => (
        <Ref innerRef={provided.innerRef}>
          <Table.Row {...provided.draggableProps} {...provided.dragHandleProps}>
            <Table.Cell>
              {note.comment}
              <Button
                icon="close"
                size="mini"
                style={{
                  backgroundColor: "lightgray",
                  padding: "0",
                  float: "right",
                  marginLeft: "15px"
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
