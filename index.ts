import express from "express";
import bodyParser from "body-parser";
import router from "./routes/postRoute";
import {connectDB} from "./db/connection";
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(bodyParser.json())

const port = process.env.PORT || 8000;

app.use('/v1/api', router);

/**
 * @description starting the server and connecting the db
 */
app.listen(port, async () => {
    connectDB();
    console.log(`Server running on port ${port}`);
});