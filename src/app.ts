import express from "express"
import cors from "cors"
const app=express()

import authRoute from "./routes/auth/global/auth-route.js"
import categoryRoute from "./routes/category/category-route.js"
import menuRoute from "./routes/menu/menu-route.js"
import reservationRoute from "./routes/reservation/reservation-route.js"
import restaurantTable from "./routes/restaurant-table-route/restaurant-table.js"

app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000"
}))

//auth
app.use("/restaurant/auth",authRoute)

//category
app.use("/restaurant",categoryRoute)

//menu
app.use("/restaurant",menuRoute)

//reservation
app.use("/restaurant",reservationRoute)

//tables
app.use("/restaurant",restaurantTable)

export default app