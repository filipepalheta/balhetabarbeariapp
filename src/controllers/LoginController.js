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

    static signin = async (req, res) => {
        var dados = {
            nome: req.body.nome,
            email: req.body.email,
            pass: req.body.pass,
            cell: req.body.cell
        }

        const verificarEmail = await Users.findOne({
            where: {
                email: dados.email
            }
        })

        if (!verificarEmail) {
            //Enviar email de verificação (depois)


            const salts = 10

            if (dados.cell) {
                bcryptjs.hash(dados.pass, salts, async function (err, hash) {
                    // Store hash in your password DB.

                    const user = await Users.create({
                        name: dados.nome,
                        email: dados.email,
                        celular: dados.cell,
                        password: hash,

                    })

                    res.json({ success: true, user, msg: 'Cadastrado com sucesso!' })
                });
            }else{
                res.json({ success: false, msg: 'Dados incorretos.' })
            }
           
        } else {
            res.json({ success: false, msg: 'O E-mail já existe, tente um diferente.' })
        }
    }
}

export default LoginController