import { connection as db } from '../models';
import shortid from 'shortid';

const User = db.user; 
const Order = db.order;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({ message: "Email address is required!" });
    return;
  }

  // Create a User
  const user = new User({
    unique_code: shortid.generate(),
    email: req.body.email,
    profile: {
      firstName: req.body.firstName,
      lastName: req.body.lastName
    },
    roles: ['member']
  });

  // Save User in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? 
    { $or: [
      { 'profile.firstName': { $regex: new RegExp(name), $options: "i" } },
      { 'profile.lastName': { $regex: new RegExp(name), $options: "i" } }
    ] } 
    : {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while retrieving users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "No user with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving user with id=" + id });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "No data was provided for update!"
    });
  }

  const id = req.params.id;
  
  req.body.profile = {
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }
  delete req.body.firstName;
  delete req.body.lastName;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Perhaps User was not found!`
        });
      } else res.send({ message: "User was updated successfully.", data });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User using id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Perhaps User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Failure deleting User with id=" + id
      });
    });
};


// Find all Users with active orders
exports.findAllWithActiveOrders = (req, res) => {
  
};