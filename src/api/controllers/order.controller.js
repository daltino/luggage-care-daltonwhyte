import { connection as db } from '../models';
import shortid from 'shortid';

const Order = db.order;

// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user || !req.body.meal) {
    res.status(400).send({ message: 'Order and Meal is required!' });
    return;
  }

  // Create an Order
  const order = new Order({
    unique_code: shortid.generate(),
    user: req.body.user,
    meal: req.body.meal,
    ingredients: req.body.ingredients
  });

  // Get meal and check if its active
  const Meal = db.meal;
  Meal
    .findById(req.body.meal)
    .then(data => {
      if (data.status) {
        // Save Order in the database
        order
        .save(order)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || 'Error while creating the order.'
          });
        });
      } else {
        res.status(400).send({ message: 'Meal is no longer active, you cannot place this order'})
      }
    });
};

// Create Quick Order
exports.createQuickOrder = (req, res) => {
  // Validate request
  if (!req.body.unique_code || !req.body.meal) {
    res.status(400).send({ message: 'Order and Meal is required!' });
    return;
  }

  // Get user by unique_code
  const User = db.user;
  User
    .findOne({'unique_code': req.body.unique_code})
    .then(data => {
      console.log(data);
      if (data.unique_code) {
        // Create an Order
        const order = new Order({
          unique_code: shortid.generate(),
          user: data,
          meal: req.body.meal,
          ingredients: req.body.ingredients
        });

        // Save Order in the database
        order
        .save(order)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || 'Error while creating the order.'
          });
        });
      } else {
        res.status(400).send({ message: 'User not found or incorrect user code'})
      }
    });
};

// Retrieve all orders from the database.
exports.findAll = (req, res) => {
  const _filter = req.query.filter;
  var condition = {};

  Order.find(condition)
    .populate('user', 'profile')
    .populate('meal', 'name')
    .populate('ingredients', 'name')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Error while retrieving orders.'
      });
    });
};

// Find a single order with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Order.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `No order with id ${id}` });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving order with id= ${id}` });
    });
};

// Update a Order by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'No data was provided for update!'
    });
  }

  const id = req.params.id;

  Order.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Order with id=${id}. Perhaps Order was not found!`
        });
      } else res.send({ message: 'Order was updated successfully.' });
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating Order with id= ${id}`
      });
    });
};

// Delete a Order using id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Order.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Order with id=${id}. Perhaps Order was not found!`
        });
      } else {
        res.send({
          message: 'Order was deleted successfully!'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Failure deleting Order with id= ${id}`
      });
    });
};


// Find all Users with active orders
exports.findAllActiveOrders = (req, res) => {
  
};