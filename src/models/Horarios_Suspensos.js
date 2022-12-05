import instance from "../config/conn.js";
import { DataTypes } from "sequelize";

const HorariosSupensos = instance.define('horarios_suspensos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_barbeiro: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dia: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    horario: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false
})

export default HorariosSupensos