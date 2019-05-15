import React from 'react';
import { Icon } from 'semantic-ui-react';

import Divider from './Divider';

export const Demo = () =>
  <div>
    <Divider>A Divider</Divider>
    Some Content
    <Divider>And Another One! This one with an <Icon name="map" /> Icon!!</Divider>
    Some MORE content!
  </div>

export default Demo;
