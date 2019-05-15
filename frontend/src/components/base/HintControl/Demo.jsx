import React, { Component } from 'react';

import HintControl from './HintControl';
import { Button, Checkbox, Input } from 'components';

export class Demo extends Component {
  state = {
    cb_value: false,
  };
  handle_cb = () => this.setState({ cb_value: !this.state.cb_value });

  render() {
    const { cb_value } = this.state;
    return (
      <div>
        <h3>Same styling options as Button component</h3>
        <HintControl hint="Listen!"><Button>Hey!</Button></HintControl>
        <HintControl hint={cb_value ? "Yes!" : "That's a no!"}>
          <Checkbox
            checked={cb_value}
            onChange={this.handle_cb}
            label="Am I Checked?"
          />
        </HintControl>
        <HintControl hint="This input has a very special job"><Input left_label="Special Label"/></HintControl>

        <h3>Label Properties</h3>
        Supports all properteis for semantic UI React Label Properties  (https://react.semantic-ui.com/elements/label)
        <br />
        <br />
        <HintControl
          label_props={{color: 'red'}}
          hint="A Red hint!"
        >
          <Button color="red">This button has a red hint</Button>
        </HintControl>
        <HintControl
          label_props={{color: 'yellow'}}
          hint="A yellow hint!"
        >
          <Button color="yellow">This button has a yellow hint</Button>
        </HintControl>
      </div>
    );
  }
}

export default Demo;
