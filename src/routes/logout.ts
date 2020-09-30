import { Router, Request, Response, NextFunction } from 'express' 
import app from '../app';
const router = Router();

router.get('/', (req : Request, res: Response, next: NextFunction) => {
    console.log("Logout");
    req.logout();
    // req.flash('success', 'You have logged out');
    app.locals.id = '';
    app.locals.email = '';
    res.redirect('/');
}); 

export default router;