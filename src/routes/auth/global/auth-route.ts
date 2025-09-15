import express, { Router } from "express"
import { editUser, fetchUsers, forgotPassword, resetPassword, userLogin, userRegister } from "../../../controller/auth/global/auth-controller.js"
import asyncErrorHandler from "../../../services/asyncErrorHandler.js"

const router:Router=express.Router()

router.route("/register").post(asyncErrorHandler(userRegister))
router.route("/users").get(asyncErrorHandler(fetchUsers))
router.route("user/:id").patch(asyncErrorHandler(editUser))
router.route("/login").post(asyncErrorHandler(userLogin))
router.route("/forgot-password").post(asyncErrorHandler(forgotPassword))
router.route("/reset-password").post(asyncErrorHandler(resetPassword))


export default router