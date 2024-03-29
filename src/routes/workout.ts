import { Router, Request, Response, NextFunction } from 'express'
import { getWorkoutById } from '../controllers/workout.controller';
import createError from 'http-errors';
const router = Router();

/* GET home page. */
router.get('/:workoutId', async (req: Request, res: Response, next: NextFunction) => {
    if(req.isAuthenticated()){
        try {
            const user = req.user;
            const workout = await getWorkoutById(req.params.workoutId);
            res.render('workout', { title: "Workout", workout: workout, user: user });
        } catch (error) {
            console.error(error); //to announce the use that the workout was not found
    
            next(createError(404));
        }
    } else {
        res.redirect('/login');
    }
});

export default router;
