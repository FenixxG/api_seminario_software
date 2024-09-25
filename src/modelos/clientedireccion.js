const sequelize = require('sequelize');
const db = require('../configuracion/db');

const ClienteDireccion = db.define(
    "clientedireccion",
    {
        direccion: {
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
        tablename: "clientedirecciones"
    }
);

module.exports = ClienteDireccion;