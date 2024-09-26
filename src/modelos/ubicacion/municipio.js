const sequelize = require('sequelize');
const db = require('../../configuracion/db');

const Municipio = db.define(
    "municipio",
    {
        nombre: {
            type: sequelize.STRING(50),
            allowNull: false,
        },
        codigo: {
            type: sequelize.STRING(2),
            allowNull: false
        },
        activo: {
            type: sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true
        }
    },
    {
        tablename: "municipios"
    }
);

module.exports = Municipio;