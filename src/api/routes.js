import { Router } from 'express';
import UserController from './controllers/UserController';
import OrderController from './controllers/OrderController';
import MealController from './controllers/MealController';
import IngredientController from './controllers/IngredientController';

module.exports = app => {
  var router = Router();

  // *** BEGIN USER ROUTES ****

  // Create a new User
  router.post('/users', UserController.create);
  // Retrieve all Users
  router.get('/users', UserController.findAll);
  // Retrieve all Users with active orders
  router.get('/users/with-orders', UserController.findAllWithActiveOrders);
  // Retrieve a single User with id
  router.get('/users/:id', UserController.findOne);
  // Update a User with id
  router.put('/users/:id', UserController.update);
  // Delete a Tutorial with id
  router.delete('/users/:id', UserController.delete);

  // *** END USER ROUTES ****
  
  // *** BEGIN ORDER ROUTES ****

  // Create a new Order
  router.post('/orders', OrderController.create);
  // Retrieve all Orders
  router.get('/orders', OrderController.findAll);
  // Retrieve all active Orders
  router.get('/orders/active', OrderController.findAllActiveOrders);
  // Retrieve a single Order with id
  router.get('/orders/:id', OrderController.findOne);
  // Update a Order with id
  router.put('/orders/:id', OrderController.update);
  // Delete a Tutorial with id
  router.delete('/orders/:id', OrderController.delete);
  
  // *** END ORDER ROUTES ****
  
  // *** BEGIN MEAL ROUTES ****

  // Create a new Meal
  router.post('/meals', MealController.create);
  // Retrieve all Meals
  router.get('/meals', MealController.findAll);
  // Retrieve all active Meals
  router.get('/meals/active', MealController.findAllWithActiveMeals);
  // Retrieve a single Meal with id
  router.get('/meals/:id', MealController.findOne);
  // Update a Meal with id
  router.put('/meals/:id', MealController.update);
  // Delete a Tutorial with id
  router.delete('/meals/:id', MealController.delete);
  
  // *** END MEAL ROUTES ****
  
  // *** BEGIN INGREDIENTS ROUTES ****

  // Create a new Meal
  router.post('/ingredients', IngredientController.create);
  // Retrieve all Meals
  router.get('/ingredients', IngredientController.findAll);
  // Retrieve all active Meals
  router.get('/ingredients/active', IngredientController.findAllWithActiveMeals);
  // Retrieve a single Meal with id
  router.get('/ingredients/:id', IngredientController.findOne);
  // Update a Meal with id
  router.put('/ingredients/:id', IngredientController.update);
  // Delete a Tutorial with id
  router.delete('/ingredients/:id', IngredientController.delete);
  
  // *** END INGREDIENTS ROUTES ****

  app.use('/api', router);
};