import express, { Router } from "express"
import { createCategory, deleteCategory, editCategory, fetchCategories, fetchSingleCategory } from "../../controller/category/category-controller.js"
import asyncErrorHandler from "../../services/asyncErrorHandler.js"

const router:Router=express.Router()

router.route("/category").post(asyncErrorHandler(createCategory))
router.route("/category/:id").patch(asyncErrorHandler(editCategory))
router.route("/category/:id").delete(asyncErrorHandler(deleteCategory));
router.route("/category/:id").get(asyncErrorHandler(fetchSingleCategory));
router.route("/category").get(asyncErrorHandler(fetchCategories));


export default router