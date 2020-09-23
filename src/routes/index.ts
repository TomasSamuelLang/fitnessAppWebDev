import { Router } from 'express' 
const router = Router();

/* GET home page. */
router.get('/', (req: any, res: any, next: any) => {
  res.render('index');
});

export default router;
