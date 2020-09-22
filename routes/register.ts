import {Router} from 'express' 
var router = Router();

router.get('/', (req: any, res: any, next: any) => {
  res.render('register');
});

module.exports = router;