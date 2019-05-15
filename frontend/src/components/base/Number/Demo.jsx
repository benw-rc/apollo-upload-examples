import React from 'react';

import Component from '../Component';
import Number from './Number';

export class Demo extends Component {
  state = {
    number: 2,
  }
  render() {
    return (
      <div>
        <h3>Current Value {this.state.number}</h3>
        <Number
          className="demo-number"
          label="Min: 1, Max: 20"
          value={this.state.number}
          min={1}
          max={20}
          set={number => this.setState({ number })}
        />
        <br />
        <Number
          className="demo-number"
          label="Min: 0, max: 200, Integer-only"
          value={this.state.number}
          integer
          min={0}
          max={200}
          set={number => this.setState({ number })}
        />
      </div>
    );
  }
}

export default Demo;
