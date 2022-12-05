import {Sequelize} from 'sequelize'


const instance = new Sequelize(
  'geral', 
  'root', 
  '', 
  {
    host: 'localhost',
    dialect: 'mysql'
})

// const instance = new Sequelize(
//   'palhet67_geral', 
//   'palhet67_usuario', 
//   '6m&G7ZPNh*69', 
// {
//     host: '108.179.193.193',
//     dialect: 'mysql'
// })

export default instance