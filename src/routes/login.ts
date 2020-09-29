import { Router, Request, Response, NextFunction } from 'express' 
import passport from 'passport'
import app from '../app';
const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('login', {title: "Login"});
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.email);
    console.log(req.body.password);
    passport.authenticate('local', (err, user, info) => {
      if (err) { return res.redirect('/login'); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, (err) => {
        if (err) { return res.redirect('/login'); }
        app.locals.id = user._id;
        app.locals.email = user.email;
        console.log('ID: ' + app.locals.id);
        return res.redirect('/');
      });
    })(req, res, next);
});

export default router;