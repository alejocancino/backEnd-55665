import bcrypt from 'bcrypt'

const createHash = ( password ) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(13))
}

const validatePassword = ( user, password ) => {
  const compare = bcrypt.compareSync(password, user.password)
  return compare
}

export {
  createHash,
  validatePassword
}