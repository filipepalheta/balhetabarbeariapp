import Barbers from "../models/Barbers.js"
import Users from "../models/Users.js"
import HorariosAgendados from "../models/Horarios_Agendados.js"
import ServicosAgendados from "../models/Servicos_Agendados.js"
import nodemailer from 'nodemailer'

class BarbeirosController {

    static getBarbeiros = async (req, res) => {

        const barbers = await Barbers.findAll({})

        res.json({ succes: true, barbers })
    }

    static schedule = async (req, res) => {
        var dados = {
            idUser: req.body.idUser,
            barbeiro: req.body.barber,
            data: req.body.data,
            hora: req.body.hora,
            servicos: req.body.services
        }

        if (dados.idUser && dados.barbeiro && dados.data && dados.hora && dados.servicos) {

            var diaSemana = [
                "Domingo",
                "Segunda",
                "Terça",
                "Quarta",
                "Quinta",
                "Sexta",
                "Sábado"
            ]

            const user = await Users.findOne({
                where: {
                    id: dados.idUser,
                }
            })

            const verifyAgendamento = await HorariosAgendados.findOne({
                where: {
                    id_barbeiro: dados.barbeiro,
                    status: 'em espera',
                    dia_semana: dados.data,
                    id_usuario: dados.idUser,
                }
            })

            if (!verifyAgendamento) {
                if (user) {
                    const barber = await Barbers.findOne({
                        where: {
                            id: dados.barbeiro
                        }
                    })

                    if (barber) {
                        const datetime = new Date(dados.data + ' 00:00:00')
                        // const hourAgendado = await HorariosAgendados.create({
                        //     horario: dados.hora,
                        //     id_barbeiro: dados.barbeiro,
                        //     status: 'em espera',
                        //     dia_semana: dados.data,
                        //     dia_semana_string: diaSemana[datetime.getDay()],
                        //     id_usuario: dados.idUser,
                        //     email: user.email
                        // })

                        let transporter = nodemailer.createTransport({
                            host: "palhetabarbearia.com",
                            port: 465,
                            secure: true, // true for 465, false for other ports
                            auth: {
                                user: 'nao-responda@palhetabarbearia.com', // generated ethereal user
                                pass: '3[cs!-Hf]1;r', // generated ethereal password
                            },
                        });
                        const barbeiroUser = await Users.findOne({
                            where: {
                                id: barber.id_usuario
                            }
                        })
                        // send mail with defined transport object
                        let info = await transporter.sendMail({
                            from: '"Palheta Barbearia" <nao-responda@palhetabarbearia.com>', // sender address
                            to: barbeiroUser.email, // list of receivers
                            subject: "Novo Agendamento", // Subject line
                            text: "Novo Agendamento", // plain text body
                            html: `
                            <!DOCTYPE html>
                                    <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
                                    <head>
                                        <meta charset="UTF-8">                         
                                        <meta name="viewport" content="width=device-width,initial-scale=1">
                                        <meta name="x-apple-disable-message-reformatting">                           
                                       <title></title>                    
                                        <style>                           
                                            table, td, div, h1, p {font-family: Arial, sans-serif;}                            
                                        </style>
                                    </head>
                        
                                    <body style="margin:0;padding:0;">                            
                                        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">                            
                                            <tr>                            
                                                <td align="center" style="padding:0;">                            
                                                    <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">                            
                                                        <tr>                            
                                                            <td align="center" style="padding:40px 0 30px 0;background:#B48E40;">                            
                                                                <img src="https://i.imgur.com/xgUMER9.png" alt="" width="70%" style="height:auto;display:block;" />                            
                                                            </td>                            
                                                        </tr>                            
                                                        <tr>                            
                                                            <td style="padding:36px 30px 42px 30px;">                            
                                                                <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">                            
                                                                    <tr>                            
                                                                        <td style="padding:0 0 36px 0;color:#153643;">                            
                                                                            <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Novo Agendamento</h1>                            
                                                                            <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Olá, ${barber.name}. você tem um novo agendamento marcado para o dia: ${datetime.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })} às ${dados.hora}h.</p>                                                                                
                                                                            <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Para mais informações, acompanhe o agendamento clicando no link abaixo: </p>                           
                                                                    <a href="https://www.sistema.palhetabarbearia.com/" style="background: #B48E40;                            
                                                                    color: white;                            
                                                                    display: -webkit-inline-box;                            
                                                                    display: -ms-inline-flexbox;                            
                                                                    display: inline-flex;                            
                                                                    -webkit-box-align: center;                            
                                                                    -ms-flex-align: center;                            
                                                                    align-items: center;                            
                                                                    font-size: 16px;                            
                                                                    padding: 19px 38px 15px 38px;                            
                                                                    text-align: center;                            
                                                                    font-familly: "Arima Madurai", cursive;                             
                                                                    text-transform: uppercase ;                            
                                                                    text-decoration: none                            
                                                                    ">Acompanhar Agendamento</a>                            
                                                                        </td>                            
                                                                    </tr>                            
                                                                    <tr>                            
                                                            <td style="padding:30px;background:black;">                            
                                                                <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">                            
                                                                    <tr>                            
                                                                        <td style="padding:0;width:100%;" align="left">                            
                                                                            <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">                            
                                                                                &copy; Palheta Barbearia. Esse e-mail foi gerado automaticamente, por favor não responda. Em caso de dúvidas, envie um e-mail para: contato@palhetabarbearia.com<br/>                            
                                                                            </p>                            
                                                                        </td>                            
                                                                        <td style="padding:0;width:50%;" align="right">                            
                                                                        </td>                            
                                                                    </tr>                            
                                                                </table>                            
                                                            </td>                            
                                                        </tr>                            
                                                    </table>                            
                                                </td>                            
                                            </tr>                            
                                        </table>                            
                                    </body>                            
                                    </html>
                            `, // html body
                        });
                        console.log("Email enviado: %s", barbeiroUser.email);

                        return res.send('ok')

                        if (hourAgendado) {
                            await Promise.all(
                                dados.servicos.map(async (servicoID) => {
                                    await ServicosAgendados.create({
                                        id_agendamento: hourAgendado.id,
                                        dia_semana: dados.data,
                                        dia_semana_string: diaSemana[datetime.getDay()],
                                        id_servico: servicoID

                                    })
                                })

                            )

                            const barbeiroUser = await Users.findOne({
                                where: {
                                    id: barber.id_usuario
                                }
                            })

                            return res.json({ success: true, msg: 'Agendamento concluído com sucesso!' })
                        }
                    }
                }
            } else {
                return res.json({ success: false, msg: 'Você já possui um agendamento ative, para agendar novamente cancele o outro agendamento.' })
            }
        }




        res.json({ success: false, msg: 'Ocorreu um erro ao finalizar o agendamento, por favor, tente novamente mais tarde.' })
    }
}

export default BarbeirosController