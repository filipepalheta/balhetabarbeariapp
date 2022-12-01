import { DataTypes } from "sequelize";
import instance from "../config/conn.js";


const Barbers = instance.define('barbers', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    avatar: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM('ativo', 'inativo')
    },
    id_usuario: {
        type: DataTypes.INTEGER
    },
    foto_site: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false
})

export default Barbers