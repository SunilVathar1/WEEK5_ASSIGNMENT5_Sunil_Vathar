import express from 'express'
import { timeSheetRegister } from '../controllers/TimeSheetController'
import { jwtAuthMiddleWare } from '../middlewares/jwt'

const router=express.Router()


router.post('/register',timeSheetRegister)

export default router