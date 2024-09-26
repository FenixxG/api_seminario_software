const { Router } = require('express');
const controladorCargo = require('../controladores/controladorCargo');
const rutas = Router();
rutas.get('/', controladorCargo.inicio);
rutas.get('/listar', controladorCargo.listar);
module.exports = rutas;