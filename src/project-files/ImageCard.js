import React from "react";
import { Button, Grid, Icon, Image, Modal } from "semantic-ui-react";

const ImageCard = ({ image }) => {
  const handleDelete = id => {
    console.log("lets delete image #", id);
  };

  return (
    <Modal
      trigger={
        <Grid.Column key={image.id}>
          <Image src={image.img_url} />
        </Grid.Column>
      }
      basic
      closeIcon
    >
      <Modal.Content>
        <Image src={image.img_url} fluid />
      </Modal.Content>
      <Modal.Actions>
        <Button
          basic
          color="red"
          inverted
          onClick={() => handleDelete(image.id)}
        >
          <Icon name="remove" /> Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ImageCard;
