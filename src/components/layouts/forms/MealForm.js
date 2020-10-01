import React, { useState } from 'react';
import { Form, Input, Button, Message, TextArea } from 'semantic-ui-react'
import axios from 'axios';
import config from '../../../env/config.dev';

const API = `http://${config.host}:${config.port}/api/admin`;

export const MealForm = () => {

  const state = {};
  const [errorMessage, setErrorMessage] = useState(false);
  const handleChange = (e, { name, value, checked }) => state[name] = value || checked;

  const addMeal = () => {
    const payload = {
      name: state.name,
      description: state.description,
      status: state.status,
      admin: true
    }

    axios.post(
      `${API}/meals`,
      payload
    )
    .then(() => window.location = '/admin/meals')
    .catch(e => {
      setErrorMessage('Unique Code generation conflict, try again!');
    });
  }

  return (
    <Form onSubmit={e => e.preventDefault() && addMeal}>
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
        label='Meal Name'
        name='name'
        placeholder='Meal Name'
        onChange={handleChange}
      />
      <Form.Field
        id='form-textarea-control-description'
        control={TextArea}
        label='Description'
        placeholder='Description'
        name='description'
        onChange={handleChange}
      />
      <Form.Checkbox
        label='Activate Meal'
        name='status'
        onChange={handleChange}
      />  
      <Form.Field
        id='form-button-control-public'
        control={Button}
        content='Add Meal'
        onClick={addMeal}
      />
    </Form>
  );
}

export default MealForm;
