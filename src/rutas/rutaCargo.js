const { Router } = require('express');
const { body, query } = require('express-validator');
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
    body("activo").optional().isBoolean().withMessage("SOLO SE PERMITEN VALORES BOOLEANOS"), // AL USAR .OPTIONAL SI SE ENVIA UN VALOR QUE HAGA LA VALIDACION, SI NO SE ENVIA, NO SE VALIDA
    controladorCargo.guardar);

// RUTA PARA EDITAR DATOS
rutas.put('/editar',
    query("id").isInt().withMessage("El ID debe ser un número entero")
    .custom(async value => {
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloCargo.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarCargo){
                throw new Error('El ID del cargo no existe');
            }
        }
    }),
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
    body("activo").optional().isBoolean().withMessage("SOLO SE PERMITEN VALORES BOOLEANOS"),
    controladorCargo.editar);

// RUTA PARA ELIMINAR DATOS
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloCargo.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarCargo){
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorCargo.eliminar);
module.exports = rutas;