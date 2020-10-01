import { Schema, model } from "mongoose"

export interface IExercise {
    name: string,
    description: string
}

const ExerciseSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String, required: true}
});

export default model("Exercise", ExerciseSchema);