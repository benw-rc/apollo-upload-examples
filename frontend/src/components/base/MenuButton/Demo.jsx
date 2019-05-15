import React, { Component } from 'react';
import { ButtonGroup } from 'semantic-ui-react';

import { Button } from 'components';
import MenuButton from './MenuButton';

export class Demo extends Component {
  state = {
    val_1: false,
    val_2: true,
  }
  on_toggle = (key) => () => this.setState({ [key]: !this.state[key] });
  log = string => () => console.log(string);
  render() {
    return (
      <div>
        <ButtonGroup>
          <Button>NormalButtons</Button>
          <MenuButton
            icon="meh outline"
            label="Meme MenuButton"
            contents={[
              [
                {
                  icon: 'birthday cake',
                  label: 'Lies',
                  onClick: this.log("the cake is a lie!")
                },
              ],
              [
                {
                  icon: 'long arrow alternate down',
                  label: 'Enemy Gate',
                  onClick: this.log("The enemy's gate is down"),
                },
              ],
              [
                {
                  icon: 'bullhorn',
                  label: 'Hey!',
                  onClick: this.log("LISTEN!!!"),
                },
                {
                  icon: 'gavel',
                  label: "Its dangerous outside!",
                  onClick: this.log("Take this!: (+1 Bug-smashing hammer)"),
                },
              ],
              [
                {
                  label: `Is this True? ${this.state.val_1 ? "Yes" : "No"}`,
                  toggle_val: this.state.val_1,
                  on_toggle: this.on_toggle('val_1'),
                }
              ]
            ]}
          />
          <Button>NormalButtons</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default Demo;
