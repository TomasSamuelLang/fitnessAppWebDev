import { Router, Request, Response, NextFunction } from 'express' 
import app from '../app';
const router = Router();

router.get('/', (req : Request, res: Response, next: NextFunction) => {
    console.log("Logout");
    req.logout();
    res.redirect('/');
}); 

export default router;