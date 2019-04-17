import React from "react";
import { Button, Icon, Menu, Segment, Tab } from "semantic-ui-react";
import Loaders from "../components/Loaders";
import { ProjectContainer } from "./ProjectContainer";

export default class ProjectTabs extends React.Component {
  state = { activeIndex: 1 };
  makePanes = () => {
    let panes = [];
    this.props.projects.map(project =>
      panes.push({
        menuItem: project.title,
        render: () => (
          <Tab.Pane>
            <ProjectContainer key={project.id} project={project} />
          </Tab.Pane>
        )
      })
    );
    return panes;
  };
  handleRangeChange = e => this.setState({ activeIndex: e.target.value });
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

  render() {
    const { activeIndex } = this.state;
    return (
      <div>
        <Tab
          panes={this.makePanes()}
          activeIndex={activeIndex}
          onTabChange={this.handleTabChange}
        />
      </div>
    );
  }
}
