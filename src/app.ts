import express from "express"
const app=express()

import authRoute from "./routes/auth/global/auth-route.js"

app.use(express.json())

app.use("/restaurant/auth",authRoute)

export default app