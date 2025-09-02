import { Sequelize } from "sequelize-typescript";
import { config } from "dotenv";
config()

import User from "./models/user-model.js";


const sequelize=new Sequelize({
    database:process.env.DB_NAME,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    dialect:"mysql",
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    models:[User]
})

sequelize.authenticate()
.then(()=>{
    console.log("Authentication was Successful!")
})
.catch((err)=>{
    console.log(`Something went wrong,:${err}`)
})

sequelize.sync({alter:false}).then(()=>{
    console.log("Migration was done Successfully!")
})


export default sequelize