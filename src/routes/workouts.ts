import { Router, Request, Response, NextFunction } from 'express'
import { readdirSync } from 'fs-extra';
import { getWorkouts } from '../controllers/workout.controller';
const router = Router();

/* GET home page. */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    if(req.isAuthenticated()){
        const userID = (req.user as any)['_id'];
        const user = req.user;
        const workouts = await getWorkouts(userID);
        res.render('workouts', { title: "Workouts", workouts: workouts, user: user });
    } else {
        res.redirect("/login");
    }
});

export default router;
