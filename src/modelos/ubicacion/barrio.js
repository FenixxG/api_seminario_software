const sequelize = require('sequelize');
const db = require('../../configuracion/db');

const Barrio = db.define(
    "barrio",
    {
        nombre: {
            type: sequelize.STRING(50),
            allowNull: false,
        },
        descripcion: {
            type: sequelize.TEXT,
            allowNull: true
        },
        activo: {
            type: sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true
        }
    },
    {
        tablename: "barrios"
    }
);

module.exports = Barrio;