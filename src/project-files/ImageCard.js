import React from "react";
import { Button, Grid, Icon, Image, Modal } from "semantic-ui-react";
import { deleteBoardImage } from "../actions/projectAction";
import { connect } from "react-redux";

const ImageCard = ({ image, deleteBoardImage, projectId }) => {
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
          onClick={() => deleteBoardImage(projectId, image.id)}
        >
          <Icon name="remove" /> Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default connect(
  null,
  { deleteBoardImage }
)(ImageCard);
