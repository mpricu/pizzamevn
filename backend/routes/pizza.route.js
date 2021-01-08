import { Router } from 'express';
const pizzaRoute = Router();

// Pizza model
import Pizza from '../models/pizza.model.js';

// get all pizzas

pizzaRoute.route('/').get((req, res) => {
  Pizza.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// add pizza

pizzaRoute.route('/add-pizza').post((req, res, next) => {
  // PizzaModel.create(req.body, (error, data) => {
  // if (error) {
  //   return next(error)
  // } else {
  //   res.json(data)
  // }
  console.log('req body', req.body);
  let pizza = new Pizza(req.body);
  console.log('pizza', pizza);

  pizza.save()
    .then(() => {
      res.status(200).json({ 'pizza': 'pizza in added successfully' });
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
});

//get pizza by ID

pizzaRoute.route('/edit-pizza/:id').get((req, res, next) => {
  console.log("pizzaRoute editPizza", req.params.id);
  Pizza.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update pizza

pizzaRoute.route('/update-pizza/:id').put((req, res, next) => {

  Pizza.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Pizza successfully updated!')
    }
  })
})

// Delete pizza

pizzaRoute.route('/delete-pizza/:id').delete((req, res, next) => {

  Pizza.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

export default pizzaRoute;
