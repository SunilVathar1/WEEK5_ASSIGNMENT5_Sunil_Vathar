import express from 'express'
import { ClaimsInformation } from '../controllers/ClaimsControll'
import { jwtAuthMiddleWare } from '../middlewares/jwt'

const router=express.Router()


router.post("/registerClaims",jwtAuthMiddleWare,ClaimsInformation)

export default router