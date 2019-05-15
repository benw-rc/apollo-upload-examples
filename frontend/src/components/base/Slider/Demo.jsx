import React from 'react';

import Component from '../Component';
import Slider from './Slider';

export class Demo extends Component {
  state = {
    number: 2,
  }
  load = (number) => this.setState({ number });
  render() {
    return (
      <div>
        <h3>Current Value {this.state.number}</h3>
        Min: -10, Max: 10, Update on Change
        <br />
        <Slider
          className="demo-select"
          value={this.state.number}
          min={-10}
          max={10}
          change={this.load}
        />
        <br />
        Min: 0, Max: 200, step: 10, Update on SlideStop
        <br />
        <Slider
          vertical
          className="demo-select"
          value={this.state.number}
          integer
          min={0}
          max={200}
          step={10}
          slideStop={this.load}
        />
      </div>
    );
  }
}

export default Demo;
