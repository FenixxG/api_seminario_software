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
const rutasClientes = require('./rutas/rutaCliente');
// Tablas
const db = require('./configuraciones/db');
const { CrearModelos } = require('./modelos');
/*
const modeloCargo = require('./modelos/cargo');
const modeloEmpleado = require('./modelos/empleado');
// MODELOS DE UBICACION
const modeloDepartamento = require('./modelos/ubicacion/departamento');
const modeloMunicipio = require('./modelos/ubicacion/municipio');
const modeloCiudad = require('./modelos/ubicacion/ciudad');
const modeloBarrio = require('./modelos/ubicacion/barrio');
// MODELOS DE CLIENTE
const modeloCliente = require('./modelos/cliente/cliente');
const modeloClienteDireccion = require('./modelos/cliente/clientedireccion');
const modeloClienteTelefono = require('./modelos/cliente/clientetelefono');
*/

db.authenticate()
.then( async (data) => {
    console.log("Conexion establecida");
    modeloCargo.hasMany(modeloEmpleado);
    modeloEmpleado.belongsTo(modeloCargo);

    //ubicacion
    modeloDepartamento.hasMany(modeloMunicipio);
    modeloMunicipio.belongsTo(modeloDepartamento);
    modeloMunicipio.hasMany(modeloCiudad);
    modeloCiudad.belongsTo(modeloMunicipio);
    modeloCiudad.hasMany(modeloBarrio);
    modeloBarrio.belongsTo(modeloCiudad);

    //clientes
    modeloCliente.hasMany(modeloClienteDireccion);
    modeloClienteDireccion.belongsTo(modeloCliente);
    modeloCliente.hasMany(modeloClienteTelefono);
    modeloClienteTelefono.belongsTo(modeloCliente);

    // CREANDO MODELO CARGO
    await modeloCargo.sync().then((da) => {
        console.log("Modelo Cargo Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo cargo " + e);
    })

    // CREANDO MODELO EMPLEADO
    await modeloEmpleado.sync().then((da) => {
        console.log("Modelo Empleado Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo empleado " + e);
    })

    // CREANDO MODELO DEPARTAMENTO
    await modeloDepartamento.sync().then((da)=>{
        console.log("Modelo Depatrtamento creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo departamento " + e);
    });

    // CREANDO MODELO MUNICIPIO
    await modeloMunicipio.sync().then((da)=>{
        console.log("Modelo Municipio creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo municipio " + e);
    });

    // CREANDO MODELO CIUDAD
    await modeloCiudad.sync().then((da)=>{
        console.log("Modelo Ciudad creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo ciudad " + e);
    });

    // CRENDO MODELO BARRIO
    await modeloBarrio.sync().then((da)=>{
        console.log("Modelo Barrio creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo barrio " + e);
    });

    // CRAENDO MODELO CLIENTE
    await modeloCliente.sync().then((da)=>{
        console.log("Modelo Cliente creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo cliente " + e);
    });

    // CRANDO MODELO CLIENTE DIRECCION
    await modeloClienteDireccion.sync().then((da)=>{
        console.log("Modelo ClienteDireccion creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo ClienteDireccion " + e);
    });

    // CREANDO MODELO CLIENTE TELEFONO
    await modeloClienteTelefono.sync().then((da)=>{
        console.log("Modelo ClienteTelefono creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo ClienteTelefono " + e);
    });
})
.catch((er) => {
    console.log("ERROR: " + er);
});

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

app.set('port', 3001);
app.use(express.urlencoded({extended: false}));

// Definimos Rutas
app.use('/api', require('./rutas')); //usando archivo aparte que se encarga solo de las rutas
app.use('/api/cargos', require('./rutas/rutaCargo'));
app.use('/api/empleados', require('./rutas/rutaEmpleado'));
app.use('/api/departamentos', require('./rutas/rutaDepartamentos'));
app.use('/api/municipios', require('./rutas/rutaMunicipio'));
app.use('/api/ciudades', require('./rutas/rutaCiudad'));
app.use('/api/barrios', require('./rutas/rutaBarrio'));
app.use('/api/clientes', require('./rutas/rutaCliente'));
app.use('/api/clientedirecciones', require('./rutas/rutaClienteDireccion'));
app.use('/api/clientetelefonos', require('./rutas/rutaClienteTelefono'));

// Documentacion
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.listen(app.get('port'), ()=>{
    console.log('Servidor iniciado en el puerto ' + app.get('port'));
});