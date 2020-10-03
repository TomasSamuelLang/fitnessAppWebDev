import { Router, Request, Response, NextFunction } from 'express' 
import passport from 'passport'
import app from '../app';
const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('login', {title: "Login", user: req.user});
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return res.redirect('/login'); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, (err) => {
        if (err) { return res.redirect('/login'); }
        return res.redirect('/');
      });
    })(req, res, next);
});

export default router;