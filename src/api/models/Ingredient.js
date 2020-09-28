module.exports = mongoose => {
  const Ingredient = mongoose.model(
    "ingredient",
    mongoose.Schema(
      {
        /**
         * @jsdoc value
         * @propertyOf Ingredient
         * @name Ingredient.name
         * @description
         * Name of the ingredient
         */
        name: {
          type: String,
          trim: true,
          index: true,
          unique: true,
          match: /^[a-zA-Z0-9_]+$/,
        },
        /**
         * @jsdoc value
         * @propertyOf Ingredient
         * @name Ingredient.description
         * @description
         * Description of the ingredient
         */
        description: {
          type: String,
          trim: true,
        },
        /**
         * @jsdoc value
         * @propertyOf Ingredient
         * @name Ingredient.options
         * @description
         * Sub options of this ingredient
         */
        options: [{
          type: String,
          trim: true,
          unique: true,
        }],
        /**
         * @jsdoc value
         * @propertyOf Ingredient
         * @name Ingredient.status
         * @description
         * Status of this ingredient
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

  return Ingredient;
};