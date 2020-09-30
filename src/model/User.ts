import { Schema, model } from "mongoose"
import { hashSync, compareSync } from 'bcrypt';

const UserSchema = new Schema({
  email: {type: String, require: true},
  password: {type: String, require: true},
});

export const hashPassword = (pasword: String) => {
  return hashSync(pasword,10);
};

UserSchema.methods.isValid = function(hashhedPassword: String){
  return compareSync(hashhedPassword,this.password);
} 

export default model("User", UserSchema);