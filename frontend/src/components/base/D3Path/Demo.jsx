import React from 'react';

import Component from '../Component';
import Path from './D3Path';

import './Demo.scss';

export class Demo extends Component {
  state = {
    val_1: false,
    val_2: false,
  }
  handle_toggle = (key) => () => this.setState({ [key]: !this.state[key] });
  render() {
    return (
      <svg className="d3-path-gallery" width={200} height={200}>
        <Path
          points={[
            [0, 0],
            [0, 10],
            [20, 10],
            [20, 40],
            [80, 40],
            [80, 100],
            [120, 100],
            [120, 140],
            [170, 140],
          ]}
          strokeWidth={5}
          stroke="blue"
          fill="red"
        />
      </svg>
    );
  }
}

export default Demo;
