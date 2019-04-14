import React from "react";
import { Container, Header, Tab } from "semantic-ui-react";
import { connect } from "react-redux";

class Settings extends React.Component {
  state = { activeIndex: 1 };

  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

  render() {
    console.log(this.props);
    const { activeIndex } = this.state;
    const panes = [
      { menuItem: "Tab 1", render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
      { menuItem: "Tab 2", render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
      { menuItem: "Tab 3", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
    ];
    return (
      <Container id="settings">
        <Header textAlign="center">Settings</Header>
        <Tab
          menu={{ fluid: true, vertical: true, tabular: true }}
          panes={panes}
          activeIndex={activeIndex}
          onTabChange={this.handleTabChange}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};

export default connect(mapStateToProps)(Settings);
