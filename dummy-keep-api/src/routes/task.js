const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const {
  createTask,
  getTasks,
  deleteTask,
  getTask,
  updateTask,
} = require("../controllers/task");
const router = Router();

router.get("/", [], getTask);
router.get("/all", [], getTasks);

router.post(
  "/",
  [
    check("date", "campo obligatorio").not().isEmpty(),
    check("title", "campo obligatorio").not().isEmpty(),
    check("description", "campo obligatorio").not().isEmpty(),
    validateFields,
  ],
  createTask
);

router.post(
  "/update",
  [
    check("_id", "campo obligatorio").not().isEmpty(),
    check("updates", "campo obligatorio").not().isEmpty(),
    validateFields,
  ],
  updateTask
);

router.delete("/", [], deleteTask);

module.exports = router;
