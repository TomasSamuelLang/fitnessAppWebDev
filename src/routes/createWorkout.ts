import { Router, Request, Response, NextFunction } from 'express'
import { getExercises } from '../controllers/exercise.controller';
import { addWorkout } from '../controllers/workout.controller';
import app from '../app';
const router = Router();

/* GET home page. */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const exercises = await getExercises();
    res.render('createWorkout', { title: "Create Workout", exercises: exercises });
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
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

    if (errors.length == 0) {
        try {
            await addWorkout({
                name: data.name,
                description: data.description,
                date: new Date(),
                exercises: data.exercises,
                userId: app.locals.id
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
});

export default router;