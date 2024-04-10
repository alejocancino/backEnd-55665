import passport from "passport";
import LocalStrategy from "passport-local";
import github from "passport-github2";

import { createUser, getUserByEmail, getUserById } from "../services/user.services.js";

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
          const user = await getUserByEmail(username); 
          if (user) {
            done("Error, usuario ya existente", false);
          }

          const result = await createUser({ 
            first_name: userData.first_name,
            last_name: userData.last_name,
            age: parseInt(userData.age),
            email: username,
            password: password,
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
        console.log(profile)
        try {
          const { name , email, login } = profile._json;

          if (!email) {
            return done("Tú GitHub Profile no tiene un email público. Configuralo e intenta de nuevo.");
          }
          let user = await getUserByEmail(email); 
          if (!user) {
            const newUser = await createUser({ 
              first_name : name ? name : login,
              email: email,
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
    const user = await getUserById(id);
    done(null, user);
  });
};

export { initPassport };