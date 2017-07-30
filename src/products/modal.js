import React from 'react';
import { Button, Modal } from 'semantic-ui-react'
import { withHandlers, withState, compose } from 'recompose';
import { addProduct } from './reducer';
import ColorRadioGroup from './color-radio-group';
import NameInput from './name-input';

const NewProductModalRaw = ({ name, modalOpen, modalError, handleChangeName, handleChangeColor, color, modalErrors, setModalOpen, handleAddProduct }) => (
  <Modal open={modalOpen}>
    <Modal.Header>Add product</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <NameInput name={name} modalErrors={modalErrors} handleChangeName={handleChangeName} />
        <ColorRadioGroup color={color} handleChangeColor={handleChangeColor} />
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button negative onClick={() => setModalOpen(false)}>Cancel</Button>
      <Button positive icon='checkmark' labelPosition='right' content='Add' onClick={() => handleAddProduct()} />
    </Modal.Actions>
  </Modal>
);

const nameRegex = /^[a-zA-Z0-9]+$/;

const validateName = (name) => {
  if (name.length < 4 || name.length > 8) {
    return [`Name should be 4-8 characters long, you entered: ${name}`];
  }

  if (!nameRegex.test(name)) {
    return [`Name should contain only letters and numbers, you entered: ${name}`]
  }

  return [];
};

const enhanceModal = compose(
  withState('color', 'setColor', null),
  withState('name', 'setName', ''),
  withState('modalErrors', 'setModalErrors', []),
  withHandlers({
    handleChangeColor: ({ setColor }) => (e, { value }) => setColor(value),
    handleChangeName: ({ setName }) => (e, { value }) => setName(value),
    handleAddProduct: ({ color, name, dispatch, setColor, setName, setModalOpen, setModalErrors }) => () => {
      const errors = validateName(name);
      if (errors.length) {
        setModalErrors(errors);

        return;
      }

      dispatch(addProduct(color, name));
      setColor(null);
      setName('');
      setModalOpen(false);
      setModalErrors(false);
    },
  }),
);

export default enhanceModal(NewProductModalRaw);
