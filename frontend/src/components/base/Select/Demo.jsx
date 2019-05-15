import React from 'react';

import Component from '../Component';
import Select from './Select';

export class Demo extends Component {
  state = {
    value: 'rogue',
  };
  classes = [
    'rogue',
    'fighter',
    'cleric',
    'wizard',
    'ranger',
    'sorcerer',
    'druid',
    'barbarian',
    'paladin',
  ];
  options = this.classes.map(i => ({ text: i, value: i }));
  render() {
    return (
      <div>
        <h3>Easy Select:  (Current Class: {this.state.value})</h3>
        Supports all options for semantic ui react Dropdowns
        (https://react.semantic-ui.com/modules/dropdown)
        <br />
        <Select options={this.options} onChange={value => this.setState({ value })} />
      </div>
    );
  }
}
export default Demo;
