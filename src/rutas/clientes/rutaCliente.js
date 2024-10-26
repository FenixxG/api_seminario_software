const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCliente = require('../../controladores/controladorCliente');
const ModeloCliente = require('../../modelos/cliente/cliente');
const rutas = Router();
rutas.get('/', controladorCliente.inicio);

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Operaciones relacionadas con los clientes
 */

/**
 * @swagger
 * /clientes/listar:
 *   get:
 *     summary: Obtener lista de clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida con exito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del cliente
 *                   primerNombre:
 *                     type: string
 *                     description: Primer nombre del cliente
 *                   primerApellido:
 *                     type: string
 *                     description: Primer apellido del cliente
 *                   correo:
 *                     type: string
 *                     description: Correo electronico del cliente
 *                   telefonos:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         telefono:
 *                           type: string
 *                           description: Numero de telefono del cliente
 *                   direcciones:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         direccion:
 *                           type: string
 *                           description: Direccion del cliente
 */
rutas.get('/listar', controladorCliente.listar);

/**
 * @swagger
 * /clientes/guardar:
 *   post:
 *     summary: Registrar un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identidad:
 *                 type: string
 *                 description: Identidad del cliente
 *               rtn:
 *                 type: string
 *                 description: RTN del cliente
 *               primernombre:
 *                 type: string
 *                 description: Primer nombre del cliente
 *               segundonombre:
 *                 type: string
 *                 description: Segundo nombre del cliente
 *               primerapellido:
 *                 type: string
 *                 description: Primer apellido del cliente
 *               segundoapellido:
 *                 type: string
 *                 description: Segundo apellido del cliente
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
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

/**
 * @swagger
 * /clientes/editar:
 *   put:
 *     summary: Editar un cliente existente
 *     tags: [Clientes]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identidad:
 *                 type: string
 *                 description: Identidad del cliente
 *               rtn:
 *                 type: string
 *                 description: RTN del cliente
 *               primernombre:
 *                 type: string
 *                 description: Primer nombre del cliente
 *               primerapellido:
 *                 type: string
 *                 description: Primer apellido del cliente
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Cliente no encontrado
 */
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

/**
 * @swagger
 * /clientes/eliminar:
 *   delete:
 *     summary: Eliminar un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente a eliminar
 *     responses:
 *       200:
 *         description: Cliente eliminado con éxito
 *       404:
 *         description: Cliente no encontrado
 */
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