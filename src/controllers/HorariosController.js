import { Op } from "sequelize"
import HorariosSupensos from "../models/Horarios_Suspensos.js"
import moment from 'moment'
import Barbers from "../models/Barbers.js"
import HorariosAgendados from "../models/Horarios_Agendados.js"
import HorariosBarbeiros from '../models/Horarios_Barbeiros.js'

class HorariosController {

    static getSuspendedHours = async (req, res) => {
        const today = new Date()
        const dia = req.query.dia
        const dateMoment = moment(dia)
        const dateFormated = dateMoment.format('YYYY-MM-DD')
        var barbers = []
        const daysOfTheWeek = [
            'Domingo',
            'Segunda',
            'Terça',
            'Quarta',
            'Quinta',
            'Sexta',
            'Sábado'
        ]

        var indexes = []
        var arrayHoursScheludes = []
        var arrayHoursSuspendeds = []

        const getBarbers = await Barbers.findAll({
            where: {
                status: 'ativo'
            }
        })

        const hoursScheduleds = await HorariosAgendados.findAll({
            attributes: ['horario'],
            where: {
                dia_semana: dia,
                status: 'em espera'
            }
        })

        hoursScheduleds.map((hoursScheduled) => {
            arrayHoursScheludes.push(hoursScheduled.horario)
        })


        const hoursSuspendeds = await HorariosSupensos.findAll({
            attributes: ['horario'],
            where: {
                dia
            }
        })

        hoursSuspendeds.map((hourSuspended) => {
            arrayHoursSuspendeds.push(hourSuspended.horario)
        })

        await Promise.all(getBarbers.map(async (barber) => {
            const getHourBarbers = await HorariosBarbeiros.findAll({
                attributes: ['hora'],
                where: {
                    dia_semana: daysOfTheWeek[dateMoment.day()],
                    id_barbeiro: barber.id
                }
            })
            var hoursBarbers = []

            getHourBarbers.map((hourBarber) => {
                if (!arrayHoursScheludes.includes(hourBarber.hora)) {
                    if (!arrayHoursSuspendeds.includes(hourBarber.hora)) {
                        hoursBarbers.push(hourBarber)
                    }

                }
            })

            var objBarber = {
                id: barber.id,
                name: barber.name,
                hours: hoursBarbers
            }

            barbers.push(objBarber)
        }))

        res.json({success: true, barbers})

    }

    static verifyEmptyObj = (obj) => {
        return JSON.stringify(obj) === '{}';
    }
}

export default HorariosController