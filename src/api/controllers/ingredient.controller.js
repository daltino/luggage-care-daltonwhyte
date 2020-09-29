import { connection as db } from '../models';
import shortid from 'shortid';

const Ingredient = db.ingredient;

// Create and Save a new Ingredient
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: 'Name of ingredient is required!' });
    return;
  }

  // Create an Ingredient
  const ingredient = new Ingredient({
    name: req.body.name,
    description: req.body.description,
    options: req.body.options,
    status: req.body.status
  });

  // Save ingredient in the database
  ingredient
    .save(ingredient)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Error while creating the ingredient.'
      });
    });
};

// Retrieve all ingredients from the database.
exports.findAll = (req, res) => {
  const _filter = req.query.filter;
  var condition = {};

  Ingredient.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Error while retrieving ingredients.'
      });
    });
};

// Find a single ingredient with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Ingredient.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `No ingredient with id ${id}` });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message:  `Error retrieving ingredient with id= ${id}` });
    });
};

// Update a ingredient by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'No data was provided for update!'
    });
  }

  const id = req.params.id;

  Ingredient.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update ingredient with id=${id}. Perhaps ingredient was not found!`
        });
      } else res.send({ message: 'ingredient was updated successfully.', data });
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating ingredient with id= ${id}`
      });
    });
};

// Delete a ingredient using id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Ingredient.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete ingredient with id=${id}. Perhaps ingredient was not found!`
        });
      } else {
        res.send({
          message: 'ingredient was deleted successfully!'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Failure deleting ingredient with id= ${id}`
      });
    });
};


// Find active ingredients
exports.findAllActiveIngredients = (_req, res) => {
  var condition = { 'status': true };

  Ingredient.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Error while retrieving active Ingredient.'
      });
    });
};