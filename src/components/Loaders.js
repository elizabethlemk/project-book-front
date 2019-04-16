import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export const Loaders = () => {
  return (
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  );
};
export default Loaders;
