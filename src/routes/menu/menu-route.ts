import express, { Router } from "express"
import asyncErrorHandler from "../../services/asyncErrorHandler.js"
import { createMenu, deleteMenu, editMenu, fetchMenu, fetchSingleMenu } from "../../controller/menu/menu-controller.js"
import upload from "../../middleware/multerUpload.js"

const router:Router=express.Router()

router.route("/menu").post(upload.single("menuImage"),asyncErrorHandler(createMenu))
router.route("/menu/:id").patch(upload.single("menuImage"),asyncErrorHandler(editMenu))
router.route("/menu").get(asyncErrorHandler(fetchMenu))
router.route("/menu/:id").get(asyncErrorHandler(fetchSingleMenu))
router.route("/menu/:id").delete(asyncErrorHandler(deleteMenu))

export default router