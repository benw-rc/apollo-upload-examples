import React from 'react';
import { Icon } from 'semantic-ui-react';

import ModalButton from './ModalButton';

export const Demo = () =>
  <div>
    <ModalButton
      btn_text="Simple Modal"
      header_text="This is some custom Header Text"
      buttons={[
        {
          color: 'black',
          content: 'I do a scary thing',
          onClick: () => console.log("Boo!")
        },
        {
          color: 'green',
          content: <div><Icon name="checkmark" />I do a happy thing!</div>,
          onClick: () => console.log("You're Awesome!!"),
          close: false,
        }
      ]}
    >
      And there we have a Modal!
    </ModalButton>
  </div>

export default Demo;
