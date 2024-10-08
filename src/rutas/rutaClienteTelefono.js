const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorClienteTelefono = require('../controladores/controladorClienteTelefono');
const ModeloClienteTelefono = require('../modelos/cliente/clientetelefono');
const rutas = Router();
rutas.get('/', controladorClienteTelefono.inicio);
rutas.get('/listar', controladorClienteTelefono.listar);

// SE USA POST PARA MODIFICAR ALGO EN EL SERVIDOR
rutas.post('/guardar',
    body("numero").isLength({ min: 3, max: 15 }).withMessage('El numero debe tener entre 3 y 15 caracteres'),
    controladorClienteTelefono.guardar);

// RUTA PARA EDITAR DATOS
rutas.put('/editar',
    query("id").isInt().withMessage("El ID debe ser un número entero")
    .custom(async value => {
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarClienteTelefono = await ModeloClienteTelefono.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarClienteTelefono){
                throw new Error('El ID del cliente telefono no existe');
            }
        }
    }),
    body("numero").isLength({ min: 3, max: 15 }).withMessage('El numero debe tener entre 3 y 15 caracteres'),
    controladorClienteTelefono.editar);

// RUTA PARA ELIMINAR DATOS
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarClienteTelefono = await ModeloClienteTelefono.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarClienteTelefono){
                throw new Error('El id del cliente telefono no existe');
            }
        }
    }),
    controladorClienteTelefono.eliminar);
module.exports = rutas;