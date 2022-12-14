import bcryptjs from "bcryptjs"
import Users from "../models/Users.js"


class LoginController {
    static signin = async (req, res) => {
        const email = req.body.email
        const pass = req.body.pass

        const user = await Users.findOne({
            where: {
                email
            }
        })

        if (user) {

            bcryptjs.compare(pass, user.password).then((result) => {
                if (result) {
                    res.json({ success: true, user })
                } else {
                    res.json({ success: false, message: 'Email ou senha incorretos' })
                }
            })
        } else {
            res.json({ success: false, message: 'Email ou senha incorretos.' })

        }
    }
}

export default LoginController