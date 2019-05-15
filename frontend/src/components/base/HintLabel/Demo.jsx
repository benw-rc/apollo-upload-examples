import React from 'react';

import HintLabel from './HintLabel';

export const Demo = () =>
  <div>
    <h3>Simple value, label + hint wrapper</h3>
    <HintLabel hint="Listen!" label="Field Label" value="Hey!" />
  </div>

export default Demo;
