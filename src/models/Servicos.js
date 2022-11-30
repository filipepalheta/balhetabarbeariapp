import instance from "../config/conn.js";
import { DataTypes } from "sequelize";

const Servicos = instance.define('servicos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    servico_nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('ativo', 'inativo'),
        allowNull: false
    },
    valor: {
        type: DataTypes.DECIMAL(16.5),
        allowNull: false
    },
    qtd_fichas: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ordem: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false
})

export default Servicos