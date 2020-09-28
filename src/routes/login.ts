import { Router, Request, Response, NextFunction } from 'express' 
import passport from 'passport'
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
        return res.redirect('/');
      });
    })(req, res, next);
});

// router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
// res.redirect('/'); });

export default router;