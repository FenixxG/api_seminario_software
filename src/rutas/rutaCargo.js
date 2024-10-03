const { Router } = require('express');
const { body } = require('express-validator');
const controladorCargo = require('../controladores/controladorCargo');
const ModeloCargo = require('../modelos/cargo');
const rutas = Router();
rutas.get('/', controladorCargo.inicio);
rutas.get('/listar', controladorCargo.listar);

// SE USA POST PARA MODIFICAR ALGO EN EL SERVIDOR
rutas.post('/guardar',
    body("nombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres')
    .custom(async value => {
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloCargo.findOne({
                where: {
                    nombre: value
                }
            });
            if(buscarCargo){
                throw new Error('El nombre del cargo ya existe');
            }
        }
    }),
    controladorCargo.guardar);
module.exports = rutas;