import { UserSchema } from "../schemas/users.schema.js";

class UserManager {
  async newUser({ first_name, last_name, age, email, password }) {
    try {
      const newUser = await UserSchema.create({
        first_name,
        last_name,
        age,
        email,
        password,
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await UserSchema.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getUserById(id) {
    try {
      const user = await UserSchema.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export { UserManager };
