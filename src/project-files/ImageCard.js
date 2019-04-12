import React from "react";
import { Grid, Image, Modal } from "semantic-ui-react";

const ImageCard = ({ image, index }) => {
  return (
    <Modal
      trigger={
        <Grid.Column key={index}>
          <Image src={image} />
        </Grid.Column>
      }
      closeIcon
    >
      <Modal.Content>
        <Image src={image} fluid />
      </Modal.Content>
    </Modal>
  );
};

export default ImageCard;
