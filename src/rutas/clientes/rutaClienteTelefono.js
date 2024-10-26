const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorClienteTelefono = require('../../controladores/controladorClienteTelefono');
const ModeloClienteTelefono = require('../../modelos/cliente/clientetelefono');
const rutas = Router();

/**
 * @swagger
 * tags:
 *   name: Teléfonos de Clientes
 *   description: Operaciones relacionadas con los teléfonos de los clientes
 */

/**
 * @swagger
 * /clientetelefono:
 *   get:
 *     summary: Página de inicio de teléfonos de clientes
 *     tags: [ClienteTelefono]
 *     responses:
 *       200:
 *         description: Página de inicio cargada con éxito
 */
rutas.get('/', controladorClienteTelefono.inicio);

/**
 * @swagger
 * /clientetelefono/listar:
 *   get:
 *     summary: Obtener lista de teléfonos de clientes
 *     tags: [ClienteTelefono]
 *     responses:
 *       200:
 *         description: Lista de teléfonos de clientes obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del teléfono del cliente
 *                   numero:
 *                     type: string
 *                     description: Número de teléfono del cliente
 */
rutas.get('/listar', controladorClienteTelefono.listar);

/**
 * @swagger
 * /clientetelefono/guardar:
 *   post:
 *     summary: Registrar un nuevo teléfono de cliente
 *     tags: [ClienteTelefono]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero:
 *                 type: string
 *                 description: Número de teléfono del cliente
 *     responses:
 *       201:
 *         description: Teléfono de cliente creado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
rutas.post('/guardar',
    body("numero").isLength({ min: 3, max: 15 }).withMessage('El numero debe tener entre 3 y 15 caracteres'),
    controladorClienteTelefono.guardar);

/**
 * @swagger
 * /clientetelefono/editar:
 *   put:
 *     summary: Editar un teléfono de cliente existente
 *     tags: [ClienteTelefono]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del teléfono de cliente a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero:
 *                 type: string
 *                 description: Nuevo número de teléfono del cliente
 *     responses:
 *       200:
 *         description: Teléfono de cliente actualizado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Teléfono de cliente no encontrado
 */
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

/**
 * @swagger
 * /clientetelefono/eliminar:
 *   delete:
 *     summary: Eliminar un teléfono de cliente
 *     tags: [ClienteTelefono]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del teléfono de cliente a eliminar
 *     responses:
 *       200:
 *         description: Teléfono de cliente eliminado con éxito
 *       404:
 *         description: Teléfono de cliente no encontrado
 */
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