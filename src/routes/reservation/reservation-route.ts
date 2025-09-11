import express, { Router } from 'express'
import asyncErrorHandler from '../../services/asyncErrorHandler.js'
import { createReservation, deleteReservation, editReservation, fetchReservations, fetchSingleReservation } from '../../controller/reservation/reservation-controller.js'

const router:Router=express.Router()

router.route("/reservation").post(asyncErrorHandler(createReservation))
router.route("/reservation").get(asyncErrorHandler(fetchReservations))
router.route("/reservation/:id").get(asyncErrorHandler(fetchSingleReservation))
router.route("/reservation/:id").patch(asyncErrorHandler(editReservation))
router.route("/reservation/:id").delete(asyncErrorHandler(deleteReservation))

export default router