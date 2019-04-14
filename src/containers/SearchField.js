import React from "react";
import { NavLink } from "react-router-dom";
import { Label, Menu, Search } from "semantic-ui-react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import _ from "lodash";

class SearchField extends React.Component {
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.username });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.username);

      this.setState({
        isLoading: false,
        results: _.filter(this.props.allUsers, isMatch)
      });
    }, 300);
  };
  render() {
    const resultRenderer = ({ username }) => <Label content={username} />;

    resultRenderer.propTypes = {
      username: PropTypes.string
    };
    console.log(this.state);
    const { isLoading, value, results } = this.state;
    return (
      <Menu.Item>
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true
          })}
          results={results}
          resultRenderer={resultRenderer}
          value={value}
          {...this.props}
        />
      </Menu.Item>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    allUsers: state.userReducer.allUsers
  };
};

export default connect(mapStateToProps)(SearchField);
