import {Router} from 'express' 
var router = Router();

router.get('/', (req: any, res: any, next: any) => {
  res.render('login', {title: "Login"});
});

module.exports = router;