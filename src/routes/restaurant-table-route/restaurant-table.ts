import express, { Router } from "express"
import asyncErrorHandler from "../../services/asyncErrorHandler.js"
import { createTable, deleteTable, editTable, fetchSingleTable, fetchTables } from "../../controller/restaurant-table/restaurant-table-controller.js"

const router:Router=express.Router()

router.route("/restaurant-table").post(asyncErrorHandler(createTable))
router.route("/restaurant-table").get(asyncErrorHandler(fetchTables))
router.route("/restaurant-table/:id").get(asyncErrorHandler(fetchSingleTable))
router.route("/restaurant-table/:id").patch(asyncErrorHandler(editTable))
router.route("/restaurant-table/:id").delete(asyncErrorHandler(deleteTable))

export default router