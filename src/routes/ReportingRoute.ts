import express from 'express'
import { generatedReport } from '../controllers/ReportsController'

const router=express.Router()

router.get("/generate",generatedReport)

export default router