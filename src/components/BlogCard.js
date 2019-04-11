import React from "react";
import { Grid, Item } from "semantic-ui-react";

const BlogCard = props => {
  return (
    <Grid.Column>
      <Item>
        <Item.Image
          size="small"
          src="https://react.semantic-ui.com/images/wireframe/image.png"
        />
        <Item.Content header="Cute Dog" extra="121 Votes" />
      </Item>
    </Grid.Column>
  );
};

export default BlogCard;
