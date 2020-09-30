import express from 'express'
import path from 'path'
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index'
import usersRouter from './routes/users';
import loginRouter from './routes/login';
import logoutRouter from './routes/logout';
import registerRouter from './routes/register';
import workoutRouter from './routes/workout';
import workoutsRouter from './routes/workouts';
import createWorkoutRouter from './routes/createWorkout';
import createExerciseRouter from './routes/createExercise';
import ejs from 'ejs';
import mongoose from 'mongoose'
import { create } from 'domain';
import passport from 'passport';
import './passport-config';
import bodyParser from 'body-parser';

var app = express();

app.use(passport.initialize());
app.use(passport.session());

app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

app.locals.email = '';
app.locals.id = '';

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/users', usersRouter);

/*
If the user is not logined and it tries to access a page that it shouldn't it will be redirected to the index page.
The pages that can be accessed without being logined are the ones defined by the app.use(location, router) statements above this function
*/
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (app.locals.id == '') {
    res.redirect('/');
  } else {
    next();
  }
})

app.use('/logout', logoutRouter);
app.use('/workout', workoutRouter);
app.use('/workouts', workoutsRouter);
app.use('/create-workout', createWorkoutRouter);
app.use('/create-exercise', createExerciseRouter);

//setup mongo connection and mongoose
const uri = "mongodb+srv://administrator:secret2.@cluster0.9buds.gcp.mongodb.net/fitnessApp?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to mongo");
  })
  .catch((err: any) => {
    console.error("problem connecting to mongo", err);
  });

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: createError.HttpError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: "404 - Page not found" });
});


export default app;
