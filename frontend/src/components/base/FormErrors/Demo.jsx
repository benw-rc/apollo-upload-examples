import React from 'react';

import Component from '../Component';
import { Button  } from 'components';

import FormErrors from './FormErrors';

export class Demo extends Component {
  state = {
    show_errors: true,
    errors: [
      "Problem: a THING happened!",
      "Dilema: Did you SEE that?!?!",
    ]
  }
  toggle_show = () => this.setState({ show_errors: !this.state.show_errors });
  render() {
    const { show_errors, errors } = this.state;
    return (
      <div>
        <FormErrors
          className="gallery-errors"
          show={show_errors}
          errors={errors}
        />
        <Button onClick={this.toggle_show}>
          Toggle Errors
        </Button>
      </div>
    );
  }
}

export default Demo;
