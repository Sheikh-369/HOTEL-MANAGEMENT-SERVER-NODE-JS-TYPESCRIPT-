import express from "express"
import cors from "cors"
const app=express()

import authRoute from "./routes/auth/global/auth-route.js"
import categoryRoute from "./routes/category/category-route.js"

app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000"
}))

//auth
app.use("/restaurant/auth",authRoute)

//category
app.use("/restaurant",categoryRoute)

export default app