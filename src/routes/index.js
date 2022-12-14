import express from 'express'
import BarbeirosController from '../controllers/BarbeirosController.js'
import HorariosController from '../controllers/HorariosController.js'
import LoginController from '../controllers/LoginController.js'
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
router.post('/agendar', BarbeirosController.schedule)
router.get('/agendamentos', BarbeirosController.getScheludes)
router.post('/agendamentos/excluir', BarbeirosController.deleteSchedule)

router.get('/hours-suspendeds', HorariosController.getSuspendedHoursFromBarber)

router.post('/login', LoginController.signin)
router.post('/cadastrar', LoginController.register)



export default router;
