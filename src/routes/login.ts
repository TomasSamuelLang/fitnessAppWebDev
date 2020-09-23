import { Router } from 'express' 
const router = Router();

router.get('/', (req: any, res: any, next: any) => {
  res.render('login', {title: "Login"});
});

export default router;