const { response } = require("express");
const { validationResult } = require("express-validator");

const validateFields = (req, res = response, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log("😵", error.mapped());
    return res.status(400).json({
      success: false,
      errors: error.mapped(),
    });
  }
  next();
};

module.exports = {
  validateFields,
};
