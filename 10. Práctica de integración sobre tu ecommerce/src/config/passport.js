import passport from "passport";
import LocalStrategy from "passport-local";
import github from "passport-github2";
import { UserManager } from "../dao/db/controllers/user.controllers.js";

import { createHash } from "../utils/bcrypt.js";

const userManager = new UserManager();

const initPassport = () => {
  // ** Local Strategy **
  passport.use(
    "register",
    new LocalStrategy.Strategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const userData = req.body;
          const user = await userManager.getUserByEmail(username);
          if (user) {
            done("Error, usuario ya existente", false);
          }

          const result = await userManager.newUser({
            first_name: userData.first_name,
            last_name: userData.last_name,
            age: parseInt(userData.age),
            email: username,
            password: createHash(password),
          });
          done(null, result);
        } catch (error) {
          done(`Error al crear el usuario ${error}`, false);
        }
      }
    )
  );

  // ** Github Strategy **
  passport.use(
    "github",
    new github.Strategy(
      {
        clientID: "Iv1.2ae6c4aa08c9c8e9",
        clientSecret: "5f1d668b6f1f1f85d2406553abbb5b30ae994595",
        callbackURL: "http://localhost:8080/api/auth/GithubCallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { name : first_name, email, login } = profile._json;
  
          let user = await userManager.getUserByEmail(email);
          if (!user) {
            const newUser = await userManager.newUser({
              first_name,
              email,
              password: createHash(`${email + login}123`),
            }); 
            return done(null, newUser);
          }
          return done(null, user)
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userManager.getUserById(id);
    done(null, user);
  });
};

export { initPassport };
