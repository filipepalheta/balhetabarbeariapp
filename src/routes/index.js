import express from 'express'
import BarbeirosController from '../controllers/BarbeirosController.js'
import ServicosController from '../controllers/ServicosController.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({message: 'Server init'})
})

router.get('/ping', (req, res) => {
    res.json({pong: 'pong'})
})

router.get('/services', ServicosController.getServices)

router.get('/barbers', BarbeirosController.getBarbeiros)

export default router;
