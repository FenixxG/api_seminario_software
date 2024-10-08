const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorEmpleado = require('../controladores/controladorEmpleado');
const ModeloEmpleado = require('../modelos/empleado');
const rutas = Router();
rutas.get('/', controladorEmpleado.inicio);
rutas.get('/listar', controladorEmpleado.listar);

// SE USA POST PARA MODIFICAR ALGO EN EL SERVIDOR
rutas.post('/guardar',
    body("identidad").isLength({ min: 3, max: 50 }).withMessage('La identidad debe ser un entero')
    .custom(async value => {
        if(!value){
            throw new Error('La identidad no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    identidad: value
                }
            });
            if(buscarEmpleado){
                throw new Error('La identidad del empleado ya existe');
            }
        }
    }),
    body("rtn").isLength({min: 13, max: 16}).withMessage("El rtn debe ser un entero")
    .custom(async value => {
        if(!value){
            throw new Error('El rtn no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    rtn: value
                }
            });
            if(buscarEmpleado){
                throw new Error('El rtn del empleado ya existe');
            }
        }
    }),
    body("primernombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres')
    .custom(async value => {
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    primernombre: value
                }
            });
            if(buscarEmpleado){
                throw new Error('El primer nombre del empleado ya existe');
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
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    primerapellido: value
                }
            });
            if(buscarEmpleado){
                throw new Error('El primer apellido del empleado ya existe');
            }
        }
    }),
    //body("segundoapellido").optional().isLength({ min: 3, max: 50 }).withMessage('El apellido debe tener entre 3 y 50 caracteres'),
    controladorEmpleado.guardar);

// RUTA PARA EDITAR DATOS
rutas.put('/editar',
    query("id").isInt().withMessage("El ID debe ser un numero entero")
    .custom(async value => {
        if(!value){
            throw new Error('El ID no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarEmpleado){
                throw new Error('El ID del empleado no existe');
            }
        }
    }),
    body("identidad").isLength({ min: 3, max: 50 }).withMessage('La identidad debe ser un entero')
    .custom(async value => {
        if(!value){
            throw new Error('La identidad no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    identidad: value
                }
            });
            if(buscarEmpleado){
                throw new Error('La identidad del empleado ya existe');
            }
        }
    }),
    body("rtn").isLength({min: 13, max: 16}).withMessage("El rtn debe ser un entero")
    .custom(async value => {
        if(!value){
            throw new Error('El rtn no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    rtn: value
                }
            });
            if(buscarEmpleado){
                throw new Error('El rtn del empleado ya existe');
            }
        }
    }),
    body("primernombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres')
    .custom(async value => {
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    primernombre: value
                }
            });
            if(buscarEmpleado){
                throw new Error('El primer nombre del empleado ya existe');
            }
        }
    }),
    body("primerapellido").isLength({ min: 3, max: 50 }).withMessage('El apellido debe tener entre 3 y 50 caracteres')
    .custom(async value => {
        if(!value){
            throw new Error('El primer apellido no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    primerapellido: value
                }
            });
            if(buscarEmpleado){
                throw new Error('El primer apellido del empleado ya existe');
            }
        }
    }),
    controladorEmpleado.editar);

// RUTA PARA ELIMINAR DATOS
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarEmpleado){
                throw new Error('El id del empleado no existe');
            }
        }
    }),
    controladorEmpleado.eliminar);
module.exports = rutas;