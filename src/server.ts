import app from "./app.js";
import { config } from "dotenv";
config()

import "./database/connection.ts"; // DB connection


const startServer=()=>{
    const port=process.env.PORT
    app.listen(port,()=>{
        console.log(`Server has started at port number ${port}.`)
    })
}

startServer()