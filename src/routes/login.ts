import express, { Router } from 'express' 
const router = Router();

router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render('login', {title: "Login"});
});

export default router;