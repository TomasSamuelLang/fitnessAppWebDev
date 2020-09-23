import mongoose, { Schema, model } from "mongoose"

const UserSchema = new Schema({
  userName: String,
  password: String
})

export default model("User", UserSchema);