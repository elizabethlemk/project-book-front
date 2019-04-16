import React from "react";
import { Button, Grid, Icon, Image, Modal } from "semantic-ui-react";

const ImageCard = ({ image, index }) => {
  return (
    <Modal
      trigger={
        <Grid.Column key={index}>
          <Image src={image} />
        </Grid.Column>
      }
      basic
      closeIcon
    >
      <Modal.Content>
        <Image src={image} fluid />
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted>
          <Icon name="remove" /> Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ImageCard;
