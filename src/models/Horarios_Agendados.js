import instance from "../config/conn.js";
import { DataTypes } from "sequelize";

const HorariosAgendados = instance.define('horarios_agendados', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    horario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_barbeiro: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('em espera', 'finalizado'),
        allowNull: false
    },
    dia_semana: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    dia_semana_string: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false
})

export default HorariosAgendados