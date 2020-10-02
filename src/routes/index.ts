import { Router, Request, Response, NextFunction } from 'express'
import app from '../app';
const router = Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    res.redirect('/workouts');
    console.log(req.session);
    console.log(req.user)
  } else {
    res.render('index', { title: "Home", user: req.user });
    console.log(req.session);
  }
});

export default router;
