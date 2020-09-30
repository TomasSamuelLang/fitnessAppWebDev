import { Router, Request, Response, NextFunction } from 'express'
import { getWorkouts } from '../controllers/workout.controller';
const router = Router();

/* GET home page. */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const workouts = await getWorkouts();
    res.render('workouts', { title: "Workouts", workouts: workouts });
});

export default router;
