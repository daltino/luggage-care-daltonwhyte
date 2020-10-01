module.exports = mongoose => {
  const Meal = mongoose.model(
    'Meal',
    mongoose.Schema(
      {
        /**
         * @jsdoc value
         * @propertyOf Meal
         * @name Meal.unique_code
         * @description
         * Unique code to view meal
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
         * @propertyOf Meal
         * @name Meal.name
         * @description
         * Name of the meal
         */
        name: {
          type: String,
          trim: true,
          unique: true,
        },
        /**
         * @jsdoc value
         * @propertyOf Meal
         * @name Meal.description
         * @description
         * Description of the meal
         */
        description: {
          type: String,
          trim: true,
        },
        /**
         * @jsdoc value
         * @propertyOf Meal
         * @name Meal.status
         * @description
         * Status of this meal
         */
        status: {
          type: Boolean,
          default: false
        }
      },
      {
        timestamps: true,
        toObject: { getters: true, virtuals: true },
        toJSON: { getters: true, virtuals: true },
      },
    )
  );

  return Meal;
};