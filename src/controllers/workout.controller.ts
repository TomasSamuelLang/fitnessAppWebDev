import Workout, { IWorkout, IViewWorkout } from '../model/Workout';
import { getExerciseById } from './exercise.controller';
import app from '../app';
import { IExercise } from '../model/Exercise';

export async function getWorkoutById(workoutId: string) {
    const workout = await Workout.findById(workoutId);
    console.log({ workout: workout })
    if (workout != null) {
        let workoutForView = (workout as unknown) as IWorkout;
        return {
            name: workoutForView.name,
            date: workoutForView.date,
            description: workoutForView.description,
            exercises: await Promise.all(workoutForView.exercises.map(async (exercise) => {
                const e = (await getExerciseById(exercise.id) as unknown) as IExercise;
                return {
                    name: e.name,
                    description: e.description,
                    set: exercise.set,
                    repsOrTime: exercise.repsOrTime
                }
            })).then(exercises => exercises),
        } as IViewWorkout;
    } else {
        throw (`Workout with id ${workoutId} was not found`);
    }
}

export async function getWorkouts(id: String) {
    const workouts = await Workout.find({ "userId": id });
    console.log({ workouts: workouts })
    return workouts;
}

export async function addWorkout(workout: IWorkout) {
    const newWorkout = new Workout(workout);
    newWorkout.save();
}