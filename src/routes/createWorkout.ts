import { Router, Request, Response, NextFunction } from 'express'
import { getExercises } from '../controllers/exercise.controller';
import { addWorkout } from '../controllers/workout.controller';
import app from '../app';
const router = Router();

/* GET home page. */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    if(req.isAuthenticated()){
        const exercises = await getExercises();
        const user = req.user;
        res.render('createWorkout', { title: "Create Workout", exercises: exercises, user: user });
    } else {
        res.redirect('/login');
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()){
        let errors: string[] = [];
        const data = req.body;
        if (data.name == undefined) {
            errors.push("Missing name parameter!");
        }
        if (data.description == undefined) {
            errors.push("Missing description parameter!");
        }
        if (data.exercises == undefined) {
            errors.push("Missing exercises parameter!");
        } else {
            if (!Array.isArray(data.exercises) && data.exercises.length == 0) {
                errors.push("Parameter exercises should be an array with at least one value!");
            }
        }
        console.log({ received: data });
        const userID = (req.user as any)['_id'];

        if (errors.length == 0) {
            try {
                await addWorkout({
                    name: data.name,
                    description: data.description,
                    date: new Date(),
                    exercises: data.exercises,
                    userId: userID,
                });
                res.json({ status: "success" });
            } catch (error) {
                console.error(error);
                res.status(404);
                res.json({ status: "error", errors: [error] });
            }
        } else {
            res.status(404);
            res.json({ status: "error", errors: errors });
        }
    } else {
        res.redirect('/login');
    }
});

export default router;