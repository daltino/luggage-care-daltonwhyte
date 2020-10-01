import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Message, Input } from 'semantic-ui-react'
import axios from 'axios';
import config from '../../../env/config.dev';

const API = `http://${config.host}:${config.port}/api`;

const QuickOrderForm = (props) => {

  const state = {};
  const [errorMessage, setErrorMessage] = useState(false);

  const [meal, setMeal] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const handleChange = (e, { name, value }) => state[name] = value;

  useEffect(() => {  
    setMeal(props.meal);
    setIngredients(props.ingredients.map(ingredient => ({
      'key': ingredient._id,
      'text': ingredient.name,
      'value': ingredient._id
    })));
  }, []);

  const submitOrder = () => {
    const payload = {
      unique_code: state.unique_code,
      meal: props.meal._id,
      ingredients: state.ingredients,
      admin: true
    }

    axios.post(
      `${API}/orders/quick`,
      payload
    )
    .then(() => {
      alert('Order has been placed successfully!');
      window.location = '/';
    })
    .catch(e => {
      setErrorMessage('Quick Order could not be place, check your customer code!');
    });
  }

  return (
    <Form onSubmit={e => e.preventDefault() && submitOrder}>
      <Message
          visible={errorMessage !== false}
          error
          header='Error Occured'
          content={errorMessage}
        />
      <Form.Field
        required
        control={Input}
        id='form-input-control-unique_code'
        placeholder='Customer Code'
        name='unique_code'
        onChange={handleChange}
      />
      <Form.Field
        required
        control={Input}
        id='form-input-control-meal'
        placeholder={`Meal of the day: ${meal.name}`}
        name='meal'
        value={`Meal of the day: ${meal.name}`}
        readonly
      />
      <Form.Field
        required
        control={Select}
        id='form-input-control-ingredients'
        placeholder='Select Ingredients'
        multiple
        name='ingredients'
        options={ingredients}
        onChange={handleChange}
      />
      <Form.Field
        primary
        id='form-button-control-public'
        control={Button}
        content='Submit Order'
        onClick={submitOrder}
      />
    </Form>
  );
}

export default QuickOrderForm;
