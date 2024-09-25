const sequelize = require('sequelize');
const db = require('../configuracion/db');

const Ciudad = db.define(
    "ciudad",
    {
        nombre: {
            type: sequelize.STRING(50),
            allowNull: false,
            unique: {
                args: true,
                msg: "Ya existe una ciudad con este nombre"
            }
        },
        codigo: {
            type: sequelize.STRING(8),
            allowNull: false
        },
        activo: {
            type: sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true
        }
    },
    {
        tablename: "ciudades"
    }
);

module.exports = Ciudad;