import React, { useState } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import config from '../../../env/config.dev';

const API = `http://${config.host}:${config.port}/api/admin`;

export const IngredientForm = () => {

  const state = {};
  const [errorMessage, setErrorMessage] = useState(false);
  const history = useHistory();
  const handleChange = (e, { name, value }) => state[name] = value;

  const addUser = () => {
    const payload = {
      email: state.email,
      firstName: state.firstName,
      lastName: state.lastName,
      admin: true
    }

    axios.post(
      `${API}/ingredients`,
      payload
    )
    .then(() => history.push('/admin'))
    .catch(e => {
      setErrorMessage('Email may have already been registered! Or Unique Code generation conflict, try again!');
    });
  }

  return (
    <Form onSubmit={e => e.preventDefault() && addUser}>
      <Message
          visible={errorMessage !== false}
          error
          header='Error Occured'
          content={errorMessage}
        />
      <Form.Group widths='equal'>
        <Form.Field
          required
          id='form-input-control-first-name'
          control={Input}
          label='First name'
          name='firstName'
          placeholder='First name'
          onChange={handleChange}
        />
        <Form.Field
          required
          id='form-input-control-last-name'
          control={Input}
          label='Last name'
          name='lastName'
          placeholder='Last name'
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Field
        id='form-input-control-error-email'
        control={Input}
        label='Email'
        name='email'
        placeholder='joe@schmoe.com'
        error={{
          content: 'Please enter a valid email address',
          pointing: 'below',
        }}
        onChange={handleChange}
      />
      <Form.Field
        id='form-button-control-public'
        control={Button}
        content='Add User'
        onClick={addUser}
      />
    </Form>
  );
}

export default IngredientForm;
