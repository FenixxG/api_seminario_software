const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorDepartamento = require('../controladores/controladorDepartamento');
const ModeloDepartamento = require('../modelos/ubicacion/departamento');
const rutas = Router();
rutas.get('/', controladorDepartamento.inicio);
rutas.get('/listar', controladorDepartamento.listar);

// SE USA POST PARA MODIFICAR ALGO EN EL SERVIDOR
rutas.post('/guardar',
    body("nombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres')
    .custom(async value => {
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarDepartamento = await ModeloDepartamento.findOne({
                where: {
                    nombre: value
                }
            });
            if(buscarDepartamento){
                throw new Error('El nombre del departamento ya existe');
            }
        }
    }),
    body("codigo").isInt().withMessage("El codigo debe ser un número entero")
    .custom(async value => {
        if(!value){
            throw new Error('El codigo no permite valores nulos');
        }
        else{
            const buscarDepartamento = await ModeloDepartamento.findOne({
                where: {
                    codigo: value
                }
            });
            if(buscarDepartamento){
                throw new Error('El codigo del departamento ya existe');
            }
        }
    }),
    body("activo").optional().isBoolean().withMessage("SOLO SE PERMITEN VALORES BOOLEANOS"), // AL USAR .OPTIONAL SI SE ENVIA UN VALOR QUE HAGA LA VALIDACION, SI NO SE ENVIA, NO SE VALIDA
    controladorDepartamento.guardar);

// RUTA PARA EDITAR DATOS
rutas.put('/editar',
    query("id").isInt().withMessage("El ID debe ser un numero entero")
    .custom(async value => {
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarDepartamento = await ModeloDepartamento.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarDepartamento){
                throw new Error('El ID del departamento no existe');
            }
        }
    }),
    body("nombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3-50 caracteres')
    .custom(async value => {
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarDepartamento = await ModeloDepartamento.findOne({
                where: {
                    nombre: value
                }
            });
            if(buscarDepartamento){
                throw new Error('El nombre del departamento ya existe');
            }
        }
    }),
    body("codigo").isInt().withMessage("El codigo debe ser un numero entero")
    .custom(async value => {
        if(!value){
            throw new Error('El codigo no permite valores nulos');
        }
        else{
            const buscarDepartamento = await ModeloDepartamento.findOne({
                where: {
                    codigo: value
                }
            });
            if(buscarDepartamento){
                throw new Error('El codigo del departamento ya existe');
            }
        }
    }),
    body("activo").optional().isBoolean().withMessage("SOLO SE PERMITEN VALORES BOOLEANOS"),
    controladorDepartamento.editar);

// RUTA PARA ELIMINAR DATOS
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarDepartamento = await ModeloDepartamento.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarDepartamento){
                throw new Error('El id del departamento no existe');
            }
        }
    }),
    controladorDepartamento.eliminar);
module.exports = rutas;