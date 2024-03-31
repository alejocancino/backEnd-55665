import mongoose from "mongoose";

class MongoSingleton {
  static #instance;
  constructor() {
    mongoose.connect(process.env.MONGO_URL);
  }
  static getInstance() {
    if (this.#instance) {
      console.log("La conexión ya se instanció");
      return this.#instance;
    }
    this.#instance = new MongoSingleton();
    console.log("BBDD conectada");
    return this.#instance;
  }
}

export { MongoSingleton };
