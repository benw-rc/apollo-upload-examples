import React from 'react';
import { ButtonGroup } from 'semantic-ui-react';

import Component from '../Component';

import Button from './Button';

export class Demo extends Component {
  state = {
    toggle_val: false,
  }
  toggle_val = () => this.setState({ toggle_val: !this.state.toggle_val });
  render() {
    return (
      <div>
        <h4>Styling</h4>
        <Button>Simple Dummy Button</Button>
        <Button color="blue">Colored Button</Button>
        <Button color="blue" inverted={false}>Bold button</Button>
        <Button icon="cogs">Icon Button</Button>
        <Button icon="expand" />
        <Button active>Active button</Button>
        <h4>Button Group</h4>
        <ButtonGroup>
          <Button icon="expand" />
          <Button icon="map">Icon Button</Button>
          <Button color="green">Colored Button</Button>
        </ButtonGroup>
        <h4>Connected: Toggle value = {this.state.toggle_val ? 'True' : 'False'}</h4>
        <Button onClick={this.toggle_val}>Toggle Value</Button>
      </div>
    );
  }
}

export default Demo;
