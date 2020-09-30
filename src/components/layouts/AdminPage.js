import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
import axios from 'axios';
import config from '../../env/config.dev';
import {
  Button,
  Form,
  Grid,
  GridColumn,
  Header,
  Image,
  Input,
  Label,
  Menu,
  Message,
  Segment } from 'semantic-ui-react';
import UserList from '../UserList';
import UserForm from './forms/UserForm';
import OrderList from '../OrderList';
import OrderForm from './forms/OrderForm';
import MealList from '../MealList';
import MealForm from './forms/MealForm';
import IngredientList from '../IngredientList';
import IngredientForm from './forms/IngredientForm';
import SideMenu from './SideMenu';
// import useMagicLink from '../../utils/use-magic-link';

const API = `http://${config.host}:${config.port}/api/admin`;
const MAGIC_API_KEY = 'pk_live_8F6F4DA44CD115EF';

const AdminPage = () => {
  let magicLinkInst;

  const [showLogin, setShowLogin] = useState(false);
  const [activeItem, setActiveItem] = useState('users');
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [meals, setMeals] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();

  const login = async () => {
    setShowLogin(false);
    // if (magicLinkInst.isMagicInitialized) {
    //   const user = magicLinkInst.signIn();
    //   console.log(user);
    // }
  };

  const handleItemClick = (e, { name }) => setActiveItem(name);

  useEffect(() => {
    // magicLinkInst = useMagicLink(MAGIC_API_KEY);

    axios.get(
      `${API}/users`
    )
    .then(data => setUsers(data.data));

    axios.get(
      `${API}/orders`
    )
    .then(data => setOrders(data.data));
  }, []);

  return (
    showLogin
    ? 
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Log-in to LC Restaurant Portal
          </Header>
            <Segment stacked>
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Login Code'
                type='password'
              />

              <Button onClick={login} color='teal' fluid size='large'>
                Login
              </Button>
            </Segment>
        </Grid.Column>
      </Grid>
    :
      <div style={{padding:'20px'}}>
        <Menu pointing size='large'>
          <Menu.Item
            name='LC Restaurant'
            active={activeItem === 'admin_home'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='users'
            active={['users', 'add-user'].includes(activeItem)}
            onClick={() => { setActiveItem('users'); history.push('/admin')}}
          />
          <Menu.Item
            name='orders'
            active={activeItem === 'orders'}
            onClick={() => { setActiveItem('orders'); history.push('/admin/orders')}}
          />
          <Menu.Item
            name='meals'
            active={activeItem === 'meals'}
            onClick={() => { setActiveItem('meals'); history.push('/admin/meals')}}
          />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Grid columns={2}>
          <Grid.Column width={4}>
            <SideMenu
              activeItem={activeItem}
              users={users}
              orders={orders}
              meals={meals}
              ingredients={ingredients} />
          </Grid.Column>

          <Grid.Column width={12}>
            <Segment>
              <Switch>
                <Route exact path="/admin" render={() => <UserList users={users} />} />
                <Route path="/admin/add-user" component={UserForm} />
                <Route exact path="/admin/orders" render={() => <OrderList orders={orders} />} />
                <Route path="/admin/orders/add-order" component={OrderForm} />
                <Route exact path="/admin/meals" render={() => <MealList meals={meals} />} />
                <Route path="/admin/meals/add-meal" component={MealForm} />
                <Route exact path="/admin/ingredients" render={() => <IngredientList ingredients={ingredients} />} />
                <Route path="/admin/ingredients/add-ingredient" component={IngredientForm} />
              </Switch>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
      
  )
}

export default AdminPage
