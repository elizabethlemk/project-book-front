import React from "react";
import { Container, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { UserCard, UserBlogs } from "../components/UserCard";

class UserContainer extends React.Component {
  state = {
    user: null
  };

  componentDidMount = () => {
    const username = this.props.location.split("/")[2];
    const selectedUser = this.props.allUsers.filter(
      users => users.username === username
    );
    this.setState({ user: selectedUser[0] });
  };

  componentDidUpdate = prevProps => {
    if (this.props.allUsers !== prevProps.allUsers) {
      const username = this.props.location.split("/")[2];
      const selectedUser = this.props.allUsers.filter(
        users => users.username === username
      );
      this.setState({ user: selectedUser[0] });
    }
  };

  render() {
    console.log(this.props.location.split("/")[2], this.props.allUsers);
    console.log(this.state);
    return (
      <Container textAlign="center">
        <Grid columns={2}>
          <Grid.Column style={{ top: "10vh" }}>
            {this.state.user ? <UserCard user={this.state.user} /> : null}
          </Grid.Column>
          <Grid.Column style={{ top: "10vh" }}>
            {this.state.user ? <UserBlogs user={this.state.user} /> : null}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    allUsers: state.userReducer.allUsers
  };
};
export default connect(mapStateToProps)(UserContainer);
