import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Message } from 'semantic-ui-react'
import axios from 'axios';
import config from '../../../env/config.dev';

const API = `http://${config.host}:${config.port}/api/admin`;

const OrderForm = (props) => {

  const state = {};
  const [errorMessage, setErrorMessage] = useState(false);
  const [users, setUsers] = useState([]);
  const [meals, setMeals] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const handleChange = (e, { name, value }) => state[name] = value;

  useEffect(() => {
    setUsers(props.users.map(user => (
      { 
        'key': user._id,
        'text': `${user.profile.firstName} ${user.profile.lastName}`,
        'value': user._id
      })));
    setMeals(props.meals.map(meal => ({
      'key': meal._id,
      'text': meal.name,
      'value': meal._id
    })));
    setIngredients(props.ingredients.map(ingredient => ({
      'key': ingredient._id,
      'text': ingredient.name,
      'value': ingredient._id
    })));
  }, []);

  const addOrder = () => {
    const payload = {
      user: state.user,
      meal: state.meal,
      ingredients: state.ingredients,
      admin: true
    }

    axios.post(
      `${API}/orders`,
      payload
    )
    .then(() => window.location = '/admin/orders')
    .catch(e => {
      setErrorMessage('Unique Code generation conflict, try again!');
    });
  }

  return (
    <Form onSubmit={e => e.preventDefault() && addOrder}>
      <Message
          visible={errorMessage !== false}
          error
          header='Error Occured'
          content={errorMessage}
        />
      <Form.Field
        required
        control={Select}
        id='form-input-control-user'
        placeholder='Select Customer'
        name='user'
        options={users}
        onChange={handleChange}
      />
      <Form.Field
        required
        control={Select}
        id='form-input-control-meal'
        placeholder='Select Meal'
        name='meal'
        options={meals}
        onChange={handleChange}
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
        id='form-button-control-public'
        control={Button}
        content='Add Order'
        onClick={addOrder}
      />
    </Form>
  );
}

export default OrderForm;
