module.exports = mongoose => {
  const User = mongoose.model(
    'user',
    mongoose.Schema(
      {
        /**
         * @jsdoc value
         * @propertyOf User
         * @name User.unique_code
         * @description
         * Unique code user can login with on a certain page
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
         * @propertyOf User
         * @name User.email
         * @description
         * Primary email of user, the one he/she used for registration. Unique.
         */
        email: {
          type: String,
          trim: true,
          unique: true,
          sparse: true,
          match: /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
        },
        /**
         * @jsdoc value
         * @propertyOf User
         * @name User.profile
         * @description
         * User profile object to store user's bio details
         */
        profile: {
          /**
           * @jsdoc value
           * @propertyOf User
           * @name User.profile.firstName
           * @description
           * Firts name of user
           */
          firstName: { type: String, trim: true },
          /**
           * @jsdoc value
           * @propertyOf User
           * @name User.profile.lastName
           * @description
           * Last name of user
           */
          lastName: { type: String, trim: true },
        },
        /**
         * @jsdoc value
         * @propertyOf User
         * @name User.roles
         * @description
         * User roles/permissions (strings)
         */
        roles: [{ type: String, match: /^[a-zA-Z0-9-_:]+$/, index: true }],
      },
      {
        timestamps: true,
        toObject: { getters: true, virtuals: true },
        toJSON: { getters: true, virtuals: true },
      },
    )
  );

  return User;
};