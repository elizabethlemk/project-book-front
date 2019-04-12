import React from "react";
import { connect } from "react-redux";

class Settings extends React.Component {
  render() {
    console.log(this.props);
    return <div>Setting Page</div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};

export default connect(mapStateToProps)(Settings);
