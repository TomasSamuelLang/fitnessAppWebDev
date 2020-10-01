import Exercise, { IExercise } from '../model/Exercise';

export async function getExercises() {
    const exercises = await Exercise.find();
    console.log({exercises: exercises})
    return exercises;
}

export async function addExercise(exercise: IExercise) {
    const newExercise = new Exercise(exercise);
    newExercise.save();
    return {
        id: newExercise._id,
        name: exercise.name,
        description: exercise.description
    }
}

export async function getExerciseById(exerciseId: string) {
    const exercise = await Exercise.findById(exerciseId);
    console.log({exercises: exercise})
    if (exercise != null) {
        return exercise;
    } else {
        throw (`Exercise with id ${exerciseId} was not found`);
    }
}