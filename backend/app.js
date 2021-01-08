import express from 'express';
const app = express();
import * as bodyParser from 'body-parser';
import cors from 'cors';
import pizzaRoute from './routes/pizza.route.js';
import userRoute from './routes/user.route.js';
// const PizzaRoute = new pizzaRoute();

import mongoose from 'mongoose';
let gracefulShutdown;

// Connect mongoDB
const db = 'mongodb://localhost:27017/mevn';

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongoose connected to ' + db);
},
    error => {
        console.log("Database could't be connected to: " + error)
    }
)

mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);


// CONNECTION EVENTS
// mongoose.connection.on('connected', function () {
//     console.log('Mongoose connected to ' + db);

// });
// mongoose.connection.on('error', function (err) {
//     console.log('Mongoose connection error: ' + err);
// });
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app termination', function () {
        process.exit(0);
    });
});


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', pizzaRoute);
app.use('/api/users', userRoute);

// Create port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// Find 404
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
