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
      return res.status(500).json({ error: error.message });
    }
  }

  async getUserByEmailAndPassword(email, password) {
    try {
      const user = await UserSchema.findOne({ email, password });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export { UserManager };
