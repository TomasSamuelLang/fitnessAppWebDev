import express from 'express'
import path from 'path'
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index'
import usersRouter from './routes/users';
import loginRouter from './routes/login';
import registerRouter from './routes/register';
import ejs from 'ejs';
import mongoose from 'mongoose'
import { create } from 'domain';
import passport from 'passport';

var app = express();

require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());

app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter)

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
