import Barbers from "../models/Barbers.js"


class BarbeirosController {

    static getBarbeiros = async (req, res) => {

        const barbers = await Barbers.findAll({})

        res.json({succes: true, barbers})
    }
}

export default BarbeirosController