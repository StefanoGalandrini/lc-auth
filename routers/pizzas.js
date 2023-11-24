const express = require("express");
const router = express.Router();
const pizzasController = require("../controllers/pizzas");
const { body, checkSchema } = require("express-validator");
const pizzaCreate = require("../validations/pizzaCreate");

// GET /pizzas
router.get("/", pizzasController.index);

// GET /pizzas/:id
router.get("/:id", pizzasController.show);

// POST /pizzas
router.post(
  "/",
  body("name").notEmpty(),
  body("price").isFloat({ min: 0, max: 100 }),
  body("available").isBoolean(),
  body("glutenFree").isBoolean().optional(),
  body("vegan").isBoolean(),
  pizzasController.store
);

// PUT /pizzas/:id
router.put("/:id", checkSchema(pizzaCreate), pizzasController.update);

// DELETE /pizzas/:id
router.delete("/:id", pizzasController.destroy);

module.exports = router;
