import React from 'react';

import Accordion from './Accordion';

const LabelComponent = ({ value }) => <div>{value}</div>;

export const Demo = ({ className, ...props }) => {
  const mk_panel = (title, content) => ({ key: title, title, content: { content } });
  return (
    <div>
      <Accordion
        className='test-example'
        panels={[
          { key: 1, title: 'Basic', content: { content: "An Entry" } },
          {
            key: 2,
            title: 'Component',
            content: { content: <LabelComponent value="Label Component" /> }
          },
          mk_panel('Short-hand', <LabelComponent value="Short-Hand Component" />),
        ]}
      />
    </div>
  );
}

export default Demo;
