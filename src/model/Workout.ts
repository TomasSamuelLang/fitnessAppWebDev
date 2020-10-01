import { Schema, model } from "mongoose"

interface WorkoutExercise {
    id: string,
    set: number,
    repsOrTime: string
}

export interface IWorkout {
    name: string,
    date: Date,
    description: string,
    exercises: WorkoutExercise[],
    userId: string
}

interface IViewExercise {
    name: string,
    description: string,
    set: number,
    repsOrTime: string
}

export interface IViewWorkout {
    name: string,
    date: Date,
    description: string,
    exercises: IViewExercise[]
}

const WorkoutSchema = new Schema({
    name: { type: String, require: true },
    date: { type: Date, require: true },
    description: { type: String, required: true },
    exercises: { type: Array, required: true },
    userId: { type: Schema.Types.ObjectId, required: true }
});

export default model("Workout", WorkoutSchema);