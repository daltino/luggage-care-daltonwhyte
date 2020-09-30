import React from 'react';
import { Link } from "react-router-dom";
import {
  Label,
  Menu,
} from 'semantic-ui-react';

const SideMenu = (props) => {
  if (props.activeItem === 'users')
  {
    return (
      <Menu vertical size='huge'>
        <Menu.Item
          name='users'
        >
          <Label color='teal'>{props.users.length}</Label>
          <Link to="/admin" >Users</Link>
        </Menu.Item>

        <Menu.Item
          name='add-user'
        >
          <Link to="/admin/add-user" >Add User</Link>
        </Menu.Item>
      </Menu>
    );
  } 
  else if (props.activeItem === 'orders') {
    return (
      <Menu vertical size='huge'>
        <Menu.Item
          name='orders'
        >
          <Label color='teal'>{props.orders.length}</Label>
          <Link to="/admin/orders" >Orders</Link>
        </Menu.Item>

        <Menu.Item
          name='add-order'
        >
          <Link to="/admin/orders/add-order" >Add Orders</Link>
        </Menu.Item>
      </Menu>
    );
  }
  else if (props.activeItem === 'meals') {
    return (
      <Menu vertical size='huge'>
        <Menu.Item
          name='meals'
        >
          <Label color='teal'>{props.meals.length}</Label>
          <Link to="/admin/meals" >Meals</Link>
        </Menu.Item>

        <Menu.Item
          name='add-meal'
        >
          <Link to="/admin/meals/add-meal" >Add Meals</Link>
        </Menu.Item>
      </Menu>
    );
  }
  else if (props.activeItem === 'ingredients') {
    return (
      <Menu vertical size='huge'>
        <Menu.Item
          name='ingredients'
        >
          <Label color='teal'>{props.ingredients.length}</Label>
          <Link to="/admin/ingredients" >Ingredients</Link>
        </Menu.Item>

        <Menu.Item
          name='add-ingredient'
        >
          <Link to="/admin/ingredients/add-meal" >Add Ingredients</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default SideMenu;
