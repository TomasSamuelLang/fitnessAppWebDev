import { Router, Request, Response, NextFunction } from 'express' 
import userSchema, { hashPassword} from '../model/User';
import { findUserIfAlreadyExists } from '../controllers/user.controller';
const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('register', {title: "Register", user: req.user});
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'POST' && req.body.registerPassword === req.body.repeatPassword){

    const user = new userSchema({
      email: req.body.registerEmail,
      password: hashPassword(req.body.registerPassword),
    });

    const result = await findUserIfAlreadyExists(req.body.registerEmail);
    if(result){
      console.log("Email taken");
      res.render('register', {title: "Register", user: req.user});
    }
    else{
      try{
        await user.save();
        return res.redirect('/login');
      }
      catch(err) {
        console.log("saving to database failed");
        res.render('register', {title: "Register", user: req.user});
      }
    }
  }
});

export default router