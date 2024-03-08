import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/User.js"

// Create a new user
const createUser = async (userData) => {
  const salt = await bcrypt.genSalt()
  const passwordHash = await bcrypt.hash(userData.password, salt)

  const newUser = new User({
    ...userData,
    password: passwordHash,
  });
  
  return newUser.save()
}

// Sign a token with users id and secret key
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET)
}

// Route handle for user registration
export const register = async (req, res) => {
  try {
    //Create user with the req data
    const savedUser = await createUser(req.body)
    res.status(201).json(savedUser)
  } catch (err) {
    res.status(500).json({ error: err.message })
  } 
}
// Route handler for user login 
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) return res.status(400).json({ msg: "User does not exist. " })

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password. " })

    const token = generateToken(user._id)
    delete user.password;
    res.status(200).json({ token, user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}