const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCiudad = require('../controladores/controladorCiudad');
const ModeloCiudad = require('../modelos/ubicacion/ciudad');
const rutas = Router();
rutas.get('/', controladorCiudad.inicio);
rutas.get('/listar', controladorCiudad.listar);

// SE USA POST PARA MODIFICAR ALGO EN EL SERVIDOR
rutas.post('/guardar',
    body("nombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres')
    .custom(async value => {
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCiudad = await ModeloCiudad.findOne({
                where: {
                    nombre: value
                }
            });
            if(buscarCiudad){
                throw new Error('El nombre de la ciudad ya existe');
            }
        }
    }),
    body("codigo").isInt().withMessage("El codigo debe ser un número entero")
    .custom(async value => {
        if(!value){
            throw new Error('El codigo no permite valores nulos');
        }
        else{
            const buscarCiudad = await ModeloCiudad.findOne({
                where: {
                    codigo: value
                }
            });
            if(buscarCiudad){
                throw new Error('El codigo de la ciudad ya existe');
            }
        }
    }),
    body("activo").optional().isBoolean().withMessage("SOLO SE PERMITEN VALORES BOOLEANOS"), // AL USAR .OPTIONAL SI SE ENVIA UN VALOR QUE HAGA LA VALIDACION, SI NO SE ENVIA, NO SE VALIDA
    controladorCiudad.guardar);

// RUTA PARA EDITAR DATOS
rutas.put('/editar',
    query("id").isInt().withMessage("El ID debe ser un numero entero")
    .custom(async value => {
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCiudad = await ModeloCiudad.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarCiudad){
                throw new Error('El ID de la ciudad no existe');
            }
        }
    }),
    body("nombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3-50 caracteres')
    .custom(async value => {
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCiudad = await ModeloCiudad.findOne({
                where: {
                    nombre: value
                }
            });
            if(buscarCiudad){
                throw new Error('El nombre de la ciudad ya existe');
            }
        }
    }),
    body("codigo").isInt().withMessage("El codigo debe ser un numero entero")
    .custom(async value => {
        if(!value){
            throw new Error('El codigo no permite valores nulos');
        }
        else{
            const buscarCiudad = await ModeloCiudad.findOne({
                where: {
                    codigo: value
                }
            });
            if(buscarCiudad){
                throw new Error('El codigo de la ciudad ya existe');
            }
        }
    }),
    body("activo").optional().isBoolean().withMessage("SOLO SE PERMITEN VALORES BOOLEANOS"),
    controladorCiudad.editar);

// RUTA PARA ELIMINAR DATOS
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCiudad = await ModeloCiudad.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarCiudad){
                throw new Error('El id de la ciudad no existe');
            }
        }
    }),
    controladorCiudad.eliminar);
module.exports = rutas;