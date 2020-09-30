import { Router, Request, Response, NextFunction } from 'express'
import app from '../app';
const router = Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  if (app.locals.id != '') {
    res.redirect('/workouts');
  } else {
    res.render('index', { title: "Home" });
  }
});

export default router;
