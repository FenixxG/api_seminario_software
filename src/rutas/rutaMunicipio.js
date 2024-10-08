const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorMunicipio = require('../controladores/controladorMunicipio');
const ModeloMunicipio = require('../modelos/ubicacion/municipio');
const rutas = Router();
rutas.get('/', controladorMunicipio.inicio);
rutas.get('/listar', controladorMunicipio.listar);

// SE USA POST PARA MODIFICAR ALGO EN EL SERVIDOR
rutas.post('/guardar',
    body("nombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres')
    .custom(async value => {
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarMunicipio = await ModeloMunicipio.findOne({
                where: {
                    nombre: value
                }
            });
            if(buscarMunicipio){
                throw new Error('El nombre del municipio ya existe');
            }
        }
    }),
    body("codigo").isInt().withMessage("El codigo debe ser un numero entero")
    .custom(async value => {
        if(!value){
            throw new Error('El codigo no permite valores nulos');
        }
        else{
            const buscarMunicipio = await ModeloMunicipio.findOne({
                where: {
                    codigo: value
                }
            });
            if(buscarMunicipio){
                throw new Error('El codigo del municipio ya existe');
            }
        }
    }),
    body("activo").optional().isBoolean().withMessage("SOLO SE PERMITEN VALORES BOOLEANOS"), // AL USAR .OPTIONAL SI SE ENVIA UN VALOR QUE HAGA LA VALIDACION, SI NO SE ENVIA, NO SE VALIDA
    controladorMunicipio.guardar);

// RUTA PARA EDITAR DATOS
rutas.put('/editar',
    query("id").isInt().withMessage("El ID debe ser un numero entero")
    .custom(async value => {
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarMunicipio = await ModeloMunicipio.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarMunicipio){
                throw new Error('El ID del municipio no existe');
            }
        }
    }),
    body("nombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3-50 caracteres')
    .custom(async value => {
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarMunicipio = await ModeloMunicipio.findOne({
                where: {
                    nombre: value
                }
            });
            if(buscarMunicipio){
                throw new Error('El nombre del municipio ya existe');
            }
        }
    }),
    body("codigo").isInt().withMessage("El codigo debe ser un numero entero")
    .custom(async value => {
        if(!value){
            throw new Error('El codigo no permite valores nulos');
        }
        else{
            const buscarMunicipio = await ModeloMunicipio.findOne({
                where: {
                    codigo: value
                }
            });
            if(buscarMunicipio){
                throw new Error('El codigo del municipio ya existe');
            }
        }
    }),
    body("activo").optional().isBoolean().withMessage("SOLO SE PERMITEN VALORES BOOLEANOS"),
    controladorMunicipio.editar);

// RUTA PARA ELIMINAR DATOS
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarMunicipio = await ModeloMunicipio.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarMunicipio){
                throw new Error('El id del municipio no existe');
            }
        }
    }),
    controladorMunicipio.eliminar);
module.exports = rutas;