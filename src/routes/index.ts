import express, { Router } from 'express' 
const router = Router();

/* GET home page. */
router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render('index');
});

export default router;
