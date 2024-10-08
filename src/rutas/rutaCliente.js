const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCliente = require('../controladores/controladorCliente');
const ModeloCliente = require('../modelos/cliente/cliente');
const rutas = Router();
rutas.get('/', controladorCliente.inicio);
rutas.get('/listar', controladorCliente.listar);

// SE USA POST PARA MODIFICAR ALGO EN EL SERVIDOR
rutas.post('/guardar',
    body("identidad").isLength({ min: 3, max: 50 }).withMessage('La identidad debe ser un entero')
    .custom(async value => {
        if(!value){
            throw new Error('La identidad no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    identidad: value
                }
            });
            if(buscarCliente){
                throw new Error('La identidad del cliente ya existe');
            }
        }
    }),
    body("rtn").isLength({min: 13, max: 16}).withMessage("El rtn debe ser un entero")
    .custom(async value => {
        if(!value){
            throw new Error('El rtn no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    rtn: value
                }
            });
            if(buscarCliente){
                throw new Error('El rtn del cliente ya existe');
            }
        }
    }),
    body("primernombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres')
    .custom(async value => {
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    primernombre: value
                }
            });
            if(buscarCliente){
                throw new Error('El primer nombre del cliente ya existe');
            }
        }
    }),
    //body("segundonombre").optional().isLength({ min: 3, max: 50 }).withMessage('El segundo nombre debe tener entre 3 y 50 caracteres'),
    body("primerapellido").isLength({ min: 3, max: 50 }).withMessage('El apellido debe tener entre 3 y 50 caracteres')
    .custom(async value => {
        if(!value){
            throw new Error('El primer apellido no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    primerapellido: value
                }
            });
            if(buscarCliente){
                throw new Error('El primer apellido del cliente ya existe');
            }
        }
    }),
    //body("segundoapellido").optional().isLength({ min: 3, max: 50 }).withMessage('El apellido debe tener entre 3 y 50 caracteres'),
    controladorCliente.guardar);

// RUTA PARA EDITAR DATOS
rutas.put('/editar',
    query("id").isInt().withMessage("El ID debe ser un numero entero")
    .custom(async value => {
        if(!value){
            throw new Error('El ID no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarCliente){
                throw new Error('El ID del cliente no existe');
            }
        }
    }),
    body("identidad").isLength({ min: 3, max: 50 }).withMessage('La identidad debe ser un entero')
    .custom(async value => {
        if(!value){
            throw new Error('La identidad no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    identidad: value
                }
            });
            if(buscarCliente){
                throw new Error('La identidad del cliente ya existe');
            }
        }
    }),
    body("rtn").isLength({min: 13, max: 16}).withMessage("El rtn debe ser un entero")
    .custom(async value => {
        if(!value){
            throw new Error('El rtn no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    rtn: value
                }
            });
            if(buscarCliente){
                throw new Error('El rtn del cliente ya existe');
            }
        }
    }),
    body("primernombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres')
    .custom(async value => {
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    primernombre: value
                }
            });
            if(buscarCliente){
                throw new Error('El primer nombre del cliente ya existe');
            }
        }
    }),
    body("primerapellido").isLength({ min: 3, max: 50 }).withMessage('El apellido debe tener entre 3 y 50 caracteres')
    .custom(async value => {
        if(!value){
            throw new Error('El primer apellido no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    primerapellido: value
                }
            });
            if(buscarCliente){
                throw new Error('El primer apellido del cliente ya existe');
            }
        }
    }),
    controladorCliente.editar);

// RUTA PARA ELIMINAR DATOS
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarCliente){
                throw new Error('El id del cliente no existe');
            }
        }
    }),
    controladorCliente.eliminar);
module.exports = rutas;