import { Schema, model } from "mongoose"
import { hashSync, compareSync } from 'bcrypt';

const UserSchema = new Schema({
  email: {type: String, require: true},
  password: {type: String, require: true},
});

UserSchema.statics.hashPassword = (pasword: String) => {
  return hashSync(pasword,10);
};

UserSchema.methods.isValid = (user: any, hashedPassword: String) => {
  return compareSync(hashedPassword,user.password)
};

export default model("User", UserSchema);