import { Router, Request, Response, NextFunction } from 'express' 
import app from '../app';
const router = Router();

router.get('/', (req : Request, res: Response, next: NextFunction) => {
    console.log("Logout");
    req.logout();
    app.locals.id = '';
    app.locals.email = '';
    res.redirect('/');
}); 

export default router;