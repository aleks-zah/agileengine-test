import React from 'react';
import { Input } from 'semantic-ui-react';

const Error = (props) => <div className="error">{props.error}</div>;

const NameInput = ({ handleChangeName, modalErrors, name }) => (
  <div className="modal-row">
    <Input placeholder="name" value={name} onChange={handleChangeName} />
    {modalErrors.length > 0 &&
      modalErrors.map(err => <Error error={err} key={err} />)
    }
  </div>
);

export default NameInput;
