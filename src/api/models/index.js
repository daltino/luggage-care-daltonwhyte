'use strict';

import mongoose from 'mongoose';
import url from 'url';
import _ from 'lodash';
import config from '../config';
import extend from 'mongoose-schema-extend';
import Promise from 'bluebird';

import User from './User';
import Ingredient from './Ingredient';
import Meal from './Meal';
import Order from './Order';

mongoose.Promise = Promise;

exports.name = 'lc-mongoose';

/**
 * @jsdoc object
 * @name config
 * @description
 * Config object with MONGO_URL, MONGO_REPLICAS_NUMBER
 * @type {Object}
 */
exports.config = {
  MONGO_URL: {
    env: 'MONGO_URL',
    parse: function(value, ConfigParseError) {
      if (!value) {
        throw new ConfigParseError('MONGO_URL is empty');
      }
      if (!url.parse(value)) {
        throw new ConfigParseError('Config variable `MONGO_URL` has wrong syntax. ' +
                                   'Good one is mongodb://username:somePassword@localhost:10053/lc_restaurant_dev');
      }
      if (url.parse(value).protocol !== 'mongodb:') {
        throw new ConfigParseError('Config.MONGO_URL have to be valid mongoose URI - ' +
                                   'for example mongodb://user111:111password111@localhost:10053/lc_restaurant_dev');
      }
      return value;
    }
  },
  MONGO_REPLICAS_NUMBER: {
    default: null,
    env: 'MONGO_REPLICAS_NUMBER'
  }
};

/**
 * @jsdoc object
 * @name connection
 * @description
 * Connection object with mongoose and available models
 * @type {Object}
 */
exports.connection = {
  mongoose: mongoose,
  url: config.mongoURL,
  user: User(mongoose),
  ingredient: Ingredient(mongoose),
  meal: Meal(mongoose),
  order: Order(mongoose),
};
