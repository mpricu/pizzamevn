import { Router } from 'express';
const userRoute = Router();

// User model
import User from '../models/user.model.js';

// get all Users

userRoute.route('/').get((req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// add User

userRoute.route('/add-user').post((req, res, next) => {
  // UserModel.create(req.body, (error, data) => {
  // if (error) {
  //   return next(error)
  // } else {
  //   res.json(data)
  // }
  console.log('req body', req.body);
  let User = new User(req.body);
  console.log('User', User);

  User.save()
    .then(() => {
      res.status(200).json({ 'User': 'User in added successfully' });
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
});

//get User by ID

userRoute.route('/edit-user/:id').get((req, res, next) => {
  console.log("userRoute editUser", req.params.id);
  User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update User

userRoute.route('/update-user/:id').post((req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('User successfully updated!')
    }
  })
})

// Delete User

userRoute.route('/delete-user/:id').delete((req, res, next) => {

  User.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

export default userRoute;
