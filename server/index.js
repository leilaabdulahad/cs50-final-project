import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import cors from 'cors'
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import { register } from "./controllers/auth.js"
import { createPost } from "./controllers/posts.js"
import { deletePost } from './controllers/posts.js'
import { verifyToken } from "./middleware/auth.js"
import configureExpress from "./configuration/express.js"
import upload from "./configuration/multer.js"

// Configure environment variables
dotenv.config();

// Configure Express
const app = express();
configureExpress(app);

// Enable CORS for requests from the client app
app.use(cors({ origin: 'http://localhost:5173' }));

// Configure routes
app.post("/auth/register", upload.single("picture"), register)
app.post("/posts", verifyToken, upload.single("picture"), createPost)
app.delete("/posts/:id", verifyToken, deletePost)
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)

// Configure static files
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use("/assets", express.static(path.join(__dirname, "public/assets")))

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
  })
  .catch((error) => console.log(`${error} did not connect`))