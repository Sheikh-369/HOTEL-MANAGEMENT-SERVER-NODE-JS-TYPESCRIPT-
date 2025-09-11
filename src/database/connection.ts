import { Sequelize } from "sequelize-typescript";
import { config } from "dotenv";
config()

import User from "./models/user-model.js";
import Category from "./models/category-model.js";
import Menu from "./models/menu-model.js";
import RestaurantTable from "./models/restaurant-table-model.js";
import Reservation from "./models/reservation-model.js";



const sequelize=new Sequelize({
    database:process.env.DB_NAME,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    dialect:"mysql",
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    models:[User,Category,Menu,RestaurantTable,Reservation]
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