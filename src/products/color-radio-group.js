import React from 'react';
import { Radio } from 'semantic-ui-react'

const ColorRadioGroup = ({ color, handleChangeColor }) => (
  <div className="modal-row">
    <div className="radio-row">
      <Radio
        label='Red'
        name='colorGroup'
        value='red'
        checked={color === 'red'}
        onChange={handleChangeColor}
      />
    </div>
    <div className="radio-row">
      <Radio
        label='Green'
        name='colorGroup'
        value='green'
        checked={color === 'green'}
        onChange={handleChangeColor}
      />
    </div>
    <div className="radio-row">
      <Radio
        label='Blue'
        name='colorGroup'
        value='blue'
        checked={color === 'blue'}
        onChange={handleChangeColor}
      />
    </div>
  </div>
);

export default ColorRadioGroup;
