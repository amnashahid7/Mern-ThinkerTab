import express from 'express';
import cors from 'cors';
import notesRoutes from './routes/notesRoutes.js';
import { connectDb } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config(); // Load environment variables from .env file
// console.log(process.env.MONGO_URI); // getting undefined because we have not imported dotenv package and configured it in our server.js file. To fix this, we need to import the dotenv package and call the config() method to load the environment variables from the .env file.
 const app = express();
 const PORT = process.env.PORT || 5001; // Use the PORT from environment variables or default to 5001
//  connectDb();


 app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
 }));


 app.use(express.json()); // Middleware to parse JSON request bodies
 app.use((req,res,next)=>{
   console.log(`${req.method} ${req.url}`); // Log the HTTP method and URL of each incoming request to the console for debugging purposes.
   next(); // Call the next middleware function in the stack
 })

 app.use(rateLimiter);
 app.use("/api/notes", notesRoutes);





// first connect the database and then start the server to ensure that the application only starts if the database connection is successful. This way, we can avoid potential issues that may arise if the server starts without a working database connection.
 connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
 });
 });


  


//  mongodb+srv://amnaashahid712_db_user:SVrdCmkuSlPlSVQk@cluster0.boabfkq.mongodb.net/?appName=Cluster0
    