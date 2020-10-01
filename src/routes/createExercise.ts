import { Router, Request, Response, NextFunction } from 'express'
import { addExercise } from '../controllers/exercise.controller';
const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    let errors: string[] = [];
    const data = req.body;
    if (data.name == undefined) {
        errors.push("Missing name parameter!");
    }
    if (data.description == undefined) {
        errors.push("Missing description parameter!");
    }
    console.log({ received: data });

    if (errors.length == 0) {
        try {
            const newExercise = await addExercise({
                name: data.name,
                description: data.description,
            });
            res.json({ status: "success", exercise: newExercise });
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