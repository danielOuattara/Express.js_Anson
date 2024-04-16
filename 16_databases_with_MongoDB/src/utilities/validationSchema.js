export const putUserValidationSchema = {
  name: {
    isString: true,
    isLength: {
      options: {
        min: 2,
        max: 20,
      },
      errorMessage: "name min-length: 2 & max-length: 12",
    },
    notEmpty: {
      errorMessage: "name cannot be empty",
    },
  },
  username: {
    isString: {
      errorMessage: "username cannot be empty",
    },
    isLength: {
      options: {
        min: 2,
        max: 20,
      },
      errorMessage: "username min-length: 2 & max-length: 12",
    },
    notEmpty: {
      errorMessage: "username & username cannot be empty",
    },
  },
};
