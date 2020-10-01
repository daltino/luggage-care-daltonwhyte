import React, { useState } from 'react';
import { Form, Input, Button, Message, TextArea } from 'semantic-ui-react'
import axios from 'axios';
import config from '../../../env/config.dev';

const API = `http://${config.host}:${config.port}/api/admin`;

export const IngredientForm = () => {

  const state = {};
  const [errorMessage, setErrorMessage] = useState(false);
  const handleChange = (e, { name, value, checked }) => state[name] = value || checked;

  const addIngredient = () => {
    const payload = {
      name: state.name,
      description: state.description,
      options: state.options,
      status: state.status,
      admin: true
    }

    axios.post(
      `${API}/ingredients`,
      payload
    )
    .then(() => window.location = '/admin/ingredients')
    .catch(e => {
      setErrorMessage('Unique Code generation conflict, try again!');
    });
  }

  return (
    <Form onSubmit={e => e.preventDefault() && addIngredient}>
      <Message
          visible={errorMessage !== false}
          error
          header='Error Occured'
          content={errorMessage}
        />
      <Form.Field
        required
        id='form-input-control-name'
        control={Input}
        label='Ingredient name'
        name='name'
        placeholder='Ingredient name'
        onChange={handleChange}
      />
      <Form.Field
          required
          id='form-input-control-description'
          control={TextArea}
          label='Description'
          name='description'
          placeholder='Description'
          onChange={handleChange}
        />
      <Form.Field
          required
          id='form-input-control-description'
          control={TextArea}
          label='Options (seperate with comma)'
          name='options'
          placeholder='Options (seperate with comma)'
          onChange={handleChange}
        />
      <Form.Checkbox
        label='Activate Ingredient'
        name='status'
        onChange={handleChange}
      />  
      <Form.Field
        id='form-button-control-public'
        control={Button}
        content='Add Ingredient'
        onClick={addIngredient}
      />
    </Form>
  );
}

export default IngredientForm;
