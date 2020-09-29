import { connection as db } from '../models';
import shortid from 'shortid';

const Meal = db.meal;

// Create and Save a new Meal
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.description) {
    res.status(400).send({ message: "Name and Description of meal is required!" });
    return;
  }

  // Create a Meal
  const meal = new Meal({
    unique_code: shortid.generate(),
    name: req.body.name,
    description: req.body.description,
    admin: req.body.admin,
    status: req.body.status
  });

  // Save meal in the database
  meal
    .save(meal)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while creating the meal."
      });
    });
};

// Retrieve all meals from the database.
exports.findAll = (req, res) => {
  const _filter = req.query.filter;
  var condition = {};

  Meal.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while retrieving meals."
      });
    });
};

// Find a single meal with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Meal.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "No meal with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving meal with id=" + id });
    });
};

// Update a meal by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "No data was provided for update!"
    });
  }

  const id = req.params.id;

  Meal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update meal with id=${id}. Perhaps meal was not found!`
        });
      } else res.send({ message: "meal was updated successfully.", data });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating meal with id=" + id
      });
    });
};

// Delete a meal using id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Meal.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete meal with id=${id}. Perhaps meal was not found!`
        });
      } else {
        res.send({
          message: "meal was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Failure deleting meal with id=" + id
      });
    });
};


// Find active meal
exports.findActiveMeal = (_req, res) => {
  var condition = { 'status': true };

  Meal.findOne(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while retrieving active meal."
      });
    });
};