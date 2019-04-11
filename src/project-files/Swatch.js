import React from "react";
import { Grid, Popup } from "semantic-ui-react";
import { ChromePicker } from "react-color";
import { connect } from "react-redux";
import { updateColor } from "../actions/projectAction";

class Swatch extends React.Component {
  state = {
    active: false,
    color: this.props.color.color_hex,
    id: this.props.color.id
  };

  handleClick = () => {
    this.setState({ active: !this.state.active });
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
  { updateColor }
)(Swatch);
