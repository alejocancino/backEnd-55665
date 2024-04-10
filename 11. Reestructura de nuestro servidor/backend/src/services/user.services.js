import { UserSchema } from "../models/index.js";
import { createHash } from "../utils/bcrypt.js";

export async function createUser({ first_name, last_name, age, email, password }) {
  try {
    const newUser = await UserSchema.create({
      first_name,
      last_name,
      age,
      email,
      password: createHash(password),
    });
    return newUser;
  } catch (error) {
    throw error;
  }
}

export async function getUserByEmail(email) {
  try {
    const user = await UserSchema.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(id) {
  try {
    const user = await UserSchema.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
}
