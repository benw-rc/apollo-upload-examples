import React from 'react';
import { ButtonGroup } from 'semantic-ui-react';

import HintButton from './HintButton';
import { Button } from 'components';

export const Demo = () =>
  <div>
    <h3>Same styling options as Button component</h3>
    <HintButton hint="I do stuff!">A HintButton</HintButton>
    <HintButton color="green" hint="I do other stuff">Color</HintButton>
    <HintButton
      color="yellow"
      inverted={false}
      hint="I do other stuff"
      icon="star"
    >
      Color and bold
    </HintButton>

    <HintButton icon="expand" hint="I Probably expand stuff"/>
    <HintButton color="blue" icon="cogs" hint="Probably a config option?" />

    <h3>Label Properties</h3>
    Supports all properteis for semantic UI React Label Properties  (https://react.semantic-ui.com/elements/label)
    <br />
    <HintButton
      label_props={{color: 'red'}}
      hint="A Red hint!"
    >
      Red Hint
    </HintButton>
    <HintButton
      label_props={{color: 'yellow'}}
      hint="A yellow hint!"
    >
      Yellow Hint
    </HintButton>

    <h3>Can be grouped with normal buttons</h3>
    <ButtonGroup>
      <HintButton hint="I have a hint!">Hint Button</HintButton>
      <Button>Normal Button</Button>
      <HintButton hint="little hint button" icon="arrows alternate" />
      <HintButton hint="secondary little hint button" icon="flask" />
    </ButtonGroup>
  </div>

export default Demo;
