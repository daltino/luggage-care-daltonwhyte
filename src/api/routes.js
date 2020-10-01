import { Router } from 'express';
import UserController from './controllers/user.controller';
import OrderController from './controllers/order.controller';
import MealController from './controllers/meal.controller';
import * as IngredientController from './controllers/ingredient.controller';

exports.routes = app => {
  const router = Router();
  
  // *** BEGIN ORDER ROUTES ****

  // Create a new Order
  router.post('/orders', OrderController.create);
  // Create a new Quick Order
  router.post('/orders/quick', OrderController.createQuickOrder);
  // Retrieve all Orders
  router.get('/orders', OrderController.findAll);
  // Retrieve all active Orders
  router.get('/orders/active', OrderController.findAllActiveOrders);
  // Retrieve a single Order with id
  router.get('/orders/:id', OrderController.findOne);
  // Update a Order with id
  router.put('/orders/:id', OrderController.update);
  // Delete a Order with id
  router.delete('/orders/:id', OrderController.delete);
  
  // *** END ORDER ROUTES ****
  
  // *** BEGIN MEAL ROUTES ****

  // Retrieve active Meal
  router.get('/meals/active', MealController.findActiveMeal);
  // Retrieve a single Meal with id
  router.get('/meals/:id', MealController.findOne);
  
  // *** END MEAL ROUTES ****
  
  // *** BEGIN INGREDIENTS ROUTES ****

  // Retrieve all Ingredients
  router.get('/ingredients', IngredientController.findAll);
  // Retrieve all active Ingredients
  router.get('/ingredients/active', IngredientController.findAllActiveIngredients);
  // Retrieve a single Ingredient with id
  router.get('/ingredients/:id', IngredientController.findOne);
  
  // *** END INGREDIENTS ROUTES ****

  app.use('/api', router);
};

exports.adminRoutes = app => {
  const router = Router();

  // Login admin user
  router.post('/', UserController.loginAdmin)

  // *** BEGIN USER ROUTES ****

  // Create a new User
  router.post('/users', UserController.create);;
  // Retrieve all Users
  router.get('/users', UserController.findAll);
  // Retrieve all Users with active orders
  router.get('/users/with-orders', UserController.findAllWithActiveOrders);
  // Retrieve a single User with id
  router.get('/users/:id', UserController.findOne);
  // Update a User with id
  router.put('/users/:id', UserController.update);
  // Delete a User with id
  router.delete('/users/:id', UserController.delete);

  // *** END USER ROUTES ****

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
  // Delete a Order with id
  router.delete('/orders/:id', OrderController.delete);

  // *** BEGIN MEAL ROUTES ****

  // Create a new Meal
  router.post('/meals', MealController.create);
  // Retrieve all Meals
  router.get('/meals', MealController.findAll);
  // Retrieve active Meal
  router.get('/meals/active', MealController.findActiveMeal);
  // Retrieve a single Meal with id
  router.get('/meals/:id', MealController.findOne);
  // Update a Meal with id
  router.put('/meals/:id', MealController.update);
  // Lock a Meal with id
  router.put('/meals/lock/:id', MealController.lockMeal);
  // Unlock a Meal with id
  router.put('/meals/unlock/:id', MealController.unlockMeal);
  // Delete a Meal with id
  router.delete('/meals/:id', MealController.delete);
  
  // *** END MEAL ROUTES ****
  
  // *** BEGIN INGREDIENTS ROUTES ****

  // Create a new Ingredient
  router.post('/ingredients', IngredientController.create);
  // Retrieve all Ingredients
  router.get('/ingredients', IngredientController.findAll);
  // Retrieve all active Ingredients
  router.get('/ingredients/active', IngredientController.findAllActiveIngredients);
  // Retrieve a single Ingredient with id
  router.get('/ingredients/:id', IngredientController.findOne);
  // Update a Ingredient with id
  router.put('/ingredients/:id', IngredientController.update);
  // Delete a Ingredient with id
  router.delete('/ingredients/:id', IngredientController.delete);
  
  // *** END INGREDIENTS ROUTES ****

  app.use('/api/admin', UserController.checkIfIsAdmin, router);
}