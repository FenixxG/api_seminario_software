const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorClienteDireccion = require('../../controladores/controladorClienteDireccion');
const ModeloClienteDireccion = require('../../modelos/cliente/clientedireccion');
const rutas = Router();

/**
 * @swagger
 * tags:
 *   name: Direcciones de Clientes
 *   description: Operaciones relacionadas con las direcciones de los clientes
 */

/**
 * @swagger
 * /clientedireccion:
 *   get:
 *     summary: Página de inicio de ClienteDireccion
 *     tags: [ClienteDireccion]
 *     responses:
 *       200:
 *         description: Página de inicio cargada exitosamente
 */
rutas.get('/', controladorClienteDireccion.inicio);

/**
 * @swagger
 * /clientedireccion/listar:
 *   get:
 *     summary: Obtener lista de direcciones de clientes
 *     tags: [ClienteDireccion]
 *     responses:
 *       200:
 *         description: Lista de direcciones de clientes obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la dirección del cliente
 *                   direccion:
 *                     type: string
 *                     description: Dirección del cliente
 *                   activo:
 *                     type: boolean
 *                     description: Estado de la dirección (activo o inactivo)
 */
rutas.get('/listar', controladorClienteDireccion.listar);

/**
 * @swagger
 * /clientedireccion/guardar:
 *   post:
 *     summary: Registrar una nueva dirección de cliente
 *     tags: [ClienteDireccion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               direccion:
 *                 type: string
 *                 description: Dirección del cliente
 *               activo:
 *                 type: boolean
 *                 description: Estado de la dirección (activo o inactivo)
 *     responses:
 *       201:
 *         description: Dirección de cliente creada exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
rutas.post('/guardar',
    body("direccion").isLength({ min: 3, max: 50 }).withMessage('La direccion debe tener entre 3 y 50 caracteres'),
    body("activo").optional().isBoolean().withMessage("SOLO SE PERMITEN VALORES BOOLEANOS"), // AL USAR .OPTIONAL SI SE ENVIA UN VALOR QUE HAGA LA VALIDACION, SI NO SE ENVIA, NO SE VALIDA
    controladorClienteDireccion.guardar);

/**
 * @swagger
 * /clientedireccion/editar:
 *   put:
 *     summary: Editar una dirección de cliente existente
 *     tags: [ClienteDireccion]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la dirección de cliente a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la dirección
 *               activo:
 *                 type: boolean
 *                 description: Estado de la dirección (activo o inactivo)
 *     responses:
 *       200:
 *         description: Dirección de cliente actualizada exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Dirección de cliente no encontrada
 */
rutas.put('/editar',
    query("id").isInt().withMessage("El ID debe ser un número entero")
    .custom(async value => {
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarClienteDireccion = await ModeloClienteDireccion.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarClienteDireccion){
                throw new Error('El ID del cliente direccion no existe');
            }
        }
    }),
    body("nombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
    body("activo").optional().isBoolean().withMessage("SOLO SE PERMITEN VALORES BOOLEANOS"),
    controladorClienteDireccion.editar);

/**
 * @swagger
 * /clientedireccion/eliminar:
 *   delete:
 *     summary: Eliminar una dirección de cliente
 *     tags: [ClienteDireccion]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la dirección de cliente a eliminar
 *     responses:
 *       200:
 *         description: Dirección de cliente eliminada con éxito
 *       404:
 *         description: Dirección de cliente no encontrada
 */
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarClienteDireccion = await ModeloClienteDireccion.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarClienteDireccion){
                throw new Error('El id del cliente direccion no existe');
            }
        }
    }),
    controladorClienteDireccion.eliminar);
module.exports = rutas;