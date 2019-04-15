import React from "react";
import { Container } from "semantic-ui-react";

class UserContainer extends React.Component {
  render() {
    return <Container>Hi</Container>;
  }
}

const mapStateToProps = state => {
  return {
    allUsers: state.userReducer.allUsers
  };
};
export default connect(mapStateToProps)(UserContainer);
