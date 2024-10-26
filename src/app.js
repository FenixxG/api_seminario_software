const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
// Carga las variables de entorno
require('dotenv').config();
// Rutas
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./documentacion/swagger');
const rutasCargos = require('./rutas/rutaCargo');
const rutasEmpleado = require('./rutas/rutaEmpleado');
const rutasDepartamentos = require('./rutas/rutaDepartamentos');
const rutasMunicipios = require('./rutas/rutaMunicipio');
const rutasCiudad = require('./rutas/rutaCiudad');
const rutasBarrio = require('./rutas/rutaBarrio');
const rutasClientes = require('./rutas/clientes/rutaCliente');
const rutasClienteDireccion = require('./rutas/clientes/rutaClienteDireccion');
const rutasClienteTelefono = require('./rutas/clientes/rutaClienteTelefono');

// Tablas
const db = require('./configuraciones/db');
const { CrearModelos } = require('./modelos');


db.authenticate()
.then(() => {
    console.log("========== Conexion establecida con el servidor de BD ==========");
    CrearModelos();
})
.catch((error) => {
    console.log("ERROR: " + error);
});
// Funciones
const limitador = rateLimit({
    windowMs: 1000 * 60 * 10, // 10 minutos
    max: 100, // Maximo de peticiones
});

const app = express();
// Middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(limitador);
app.use(cors(require('./configuraciones/cors')));
app.use(express.json());


// Definimos Rutas
//app.use('/api', require('./rutas')); //usando archivo aparte que se encarga solo de las rutas
app.use('/api/cargos', rutasCargos);
app.use('/api/empleados', rutasEmpleado);
app.use('/api/departamentos', rutasDepartamentos);
app.use('/api/municipios', rutasMunicipios);
app.use('/api/ciudades', rutasCiudad);
app.use('/api/barrios', rutasBarrio);
app.use('/api/clientes', rutasClientes);
app.use('/api/clientedirecciones', rutasClienteDireccion);
app.use('/api/clientetelefonos', rutasClienteTelefono);

// Documentacion
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

module.exports = app;