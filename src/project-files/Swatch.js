import React from "react";
import { Grid, Icon, Popup } from "semantic-ui-react";
import { ChromePicker } from "react-color";
import { connect } from "react-redux";
import { updateColor, deleteColor } from "../actions/projectAction";

class Swatch extends React.Component {
  state = {
    active: false,
    color: this.props.color.color_hex,
    id: this.props.color.id
  };

  handleClick = () => {
    this.setState({ active: !this.state.active });
  };

  handleDelete = () => {
    this.props.deleteColor(this.state.id);
  };
  handleChange = color => {
    this.setState({ color: color.hex }, () =>
      this.props.updateColor(this.state.id, color.hex)
    );
  };

  render() {
    return (
      <Popup
        trigger={
          <Grid.Column>
            <Icon
              name="x"
              onClick={this.handleDelete}
              inverted
              color="grey"
              style={{
                top: "0",
                zIndex: "1000",
                left: "0",
                position: "absolute"
              }}
            />
            <div id="swatch" onClick={this.handleClick}>
              <div
                id="swatch-color"
                style={{ backgroundColor: this.state.color }}
              />
            </div>
          </Grid.Column>
        }
        content={
          <ChromePicker onChange={this.handleChange} color={this.state.color} />
        }
        on="click"
        position="bottom center"
        open={this.state.active}
      />
    );
  }
}

export default connect(
  null,
  { updateColor, deleteColor }
)(Swatch);
