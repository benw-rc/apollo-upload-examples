import React, { Component } from 'react';

import ValueLabel from './ValueLabel';
import { Slider } from 'components';

export class Demo extends Component {
  state = {
    number: 2,
  }
  render() {
    return (
      <div>
        <h3>Current Value {this.state.number}</h3>
        <ValueLabel label="Label" units="Units" value={this.state.number} />
        <br />
        <Slider
          value={this.state.number}
          min={0}
          max={200}
          change={number => this.setState({ number })}
        />
      </div>
    );
  }
}

export default Demo;
