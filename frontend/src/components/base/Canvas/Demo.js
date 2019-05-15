import React from 'react';

import Component from '../Component';
import Canvas from './Canvas';

export class Demo extends Component {
  constructor(props) {
    super(props);
    this.canvas = null;
  }
  componentDidMount() {
    this.canvas = this.refs.canvas;
  }
  draw = (ctx) => {
    ctx.rect(20, 20, 150, 150);
    ctx.strokeStyle="#FFFFFF";
    ctx.stroke();
  }
  on_zoom = (transform) => {
    console.log(transform);
  }
  render() {
    return (
      <Canvas
        ref="canvas"
        width={300}
        height={300}
        draw={this.draw}
        on_zoom={this.on_zoom}
      />
    );
  }
}

export default Demo;
