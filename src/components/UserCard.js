import React from "react";
import { Card, Grid } from "semantic-ui-react";

const UserCard = ({ user }) => {
  return (
    <Grid.Column>
      <Card
        image={user.image}
        header={user.username}
        meta={`${user.first_name} ${user.last_name}`}
      />
    </Grid.Column>
  );
};

export default UserCard;
