'use strict'

import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
   res.send('Hello courses') 
})

export default router

