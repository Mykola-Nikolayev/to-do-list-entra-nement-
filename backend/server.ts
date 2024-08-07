import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv' 
import cors from 'cors'
import appRouter from './src/routes'

dotenv.config()

const URI = process.env.MONGODB_URI
const PORT = 5050;

if(URI) {
    mongoose.connect(URI)
        .then(() => {
            console.log("mongodb is connected !")
        })
        .catch ((error) => console.log(error))
} else {
    console.log("No uri to db")
}


const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"]
}))
app.use(appRouter)

app.listen(PORT, () => {
    console.log(`server listen on port ${PORT} => url : http://localhost:${PORT}`);
});
