module.exports = mongoose => {
  const Order = mongoose.model(
    'order',
    mongoose.Schema(
      {
        /**
         * @jsdoc value
         * @propertyOf Order
         * @name Order.unique_code
         * @description
         * Unique code to view order
         */
        unique_code: {
          type: String,
          trim: true,
          index: true,
          unique: true,
          match: /^[a-zA-Z0-9_]+$/,
        },
        /**
         * @jsdoc value
         * @propertyOf Order
         * @name Order.user
         * @description
         * User who placed the order
         */
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        /**
         * @jsdoc value
         * @propertyOf Order
         * @name Order.meal
         * @description
         * Meal for this order
         */
        meal: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Meal'
        },
        /**
         * @jsdoc value
         * @propertyOf Order
         * @name Order.ingredients
         * @description
         * Meal for this order
         */
        ingredients: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Ingredient'
        }],
        /**
         * @jsdoc value
         * @propertyOf Order
         * @name Order.status
         * @description
         * Status of this order
         */
        status: {
          type: Boolean,
          default: true
        }
      },
      {
        timestamps: true,
        toObject: { getters: true, virtuals: true },
        toJSON: { getters: true, virtuals: true },
      },
    )
  );

  return Order;
};