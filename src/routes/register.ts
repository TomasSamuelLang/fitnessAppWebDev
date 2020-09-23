import express, { Router } from 'express' 
const router = Router();

router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render('register', {title: "Register"});
});

export default router