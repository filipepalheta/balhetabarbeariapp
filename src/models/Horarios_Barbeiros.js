import instance from "../config/conn.js";
import { DataTypes } from "sequelize";

const HorariosBarbeiros = instance.define('horarios_barbeiros', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    hora: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_barbeiro: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dia_semana: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false
})

export default HorariosBarbeiros