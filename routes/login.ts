import {Router} from 'express' 
var router = Router();

router.get('/', (req: any, res: any, next: any) => {
  res.render('login');
});

module.exports = router;