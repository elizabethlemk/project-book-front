import React from "react";
import { Card, Grid } from "semantic-ui-react";

const UserCard = props => {
  return (
    <Grid.Column>
      <Card
        image="/images/avatar/large/elliot.jpg"
        header="Elliot Baker"
        meta="Friend"
        description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
      />
    </Grid.Column>
  );
};

export default UserCard;
