import express, { Router } from "express"
import { userLogin, userRegister } from "../../../controller/auth/global/auth-controller.js"

const router:Router=express.Router()

router.route("/register").post(userRegister)
router.route("/login").post(userLogin)


export default router