import Servicos from "../models/Servicos.js"



class ServicosController {

    static getServices = async (req, res) => {
        const services = await Servicos.findAll({
            where: {
                status: 'ativo'
            }
        })

        console.log('opa')

        res.json({success: true, services})
    }
}

export default ServicosController