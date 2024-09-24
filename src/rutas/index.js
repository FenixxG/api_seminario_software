const { Router } = require('express');
const rutas = Router();
rutas.get('/', (req, res)=>{
    res.send("Hola Mundo");
});
rutas.get('/otra', (req, res)=>{
    var info = {
        nombre: "Cristian",
        apellido: "Miranda",
        clase: {
            codigo: "IF3algo",
            nombre: "Seminario Taller de Software"
        }
    }
    res.json(info);
});
rutas.get('/otra2', (req, res)=>{
    var info = {
        nombre: "Cristian",
        apellido: "Miranda",
        clase: {
            codigo: "IF3algo",
            nombre: "Seminario Taller de Software"
        }
    }
    res.json({clase: info.clase.codigo + ' ' + info.clase.nombre});
});
module.exports = rutas;