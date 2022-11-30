import instance from "../config/conn.js";
import { DataTypes } from "sequelize";

const ServicosAgendados = instance.define('servicos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_agendamento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dia_semana: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dia_semana_string: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_servico: {
        type: DataTypes.INTEGER
    }
}, {
    createdAt: false,
    updatedAt: false
})

export default ServicosAgendados