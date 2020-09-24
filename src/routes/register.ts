import { Router } from 'express' 
const router = Router();

router.post('/', (req: any, res: any, next: any) => {
  res.render('register', {title: "Register"});
});

export default router