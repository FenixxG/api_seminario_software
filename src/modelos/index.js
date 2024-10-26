const modeloCargo = require('./cargo');
const modeloEmpleado = require('./empleado');
// MODELOS DE UBICACION
const modeloDepartamento = require('./ubicacion/departamento');
const modeloMunicipio = require('./ubicacion/municipio');
const modeloCiudad = require('./ubicacion/ciudad');
const modeloBarrio = require('./ubicacion/barrio');
// MODELOS DE CLIENTE
const modeloCliente = require('./cliente/cliente');
const modeloClienteDireccion = require('./cliente/clientedireccion');
const modeloClienteTelefono = require('./cliente/clientetelefono');

exports.CrearModelos = async () => {
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
    await modeloCargo.sync().then(() => {
        console.log("Modelo Cargo Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo cargo " + e);
    })

    // CREANDO MODELO EMPLEADO
    await modeloEmpleado.sync().then(() => {
        console.log("Modelo Empleado Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo empleado " + e);
    })

    // CREANDO MODELO DEPARTAMENTO
    await modeloDepartamento.sync().then(() =>{
        console.log("Modelo Depatrtamento creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo departamento " + e);
    });

    // CREANDO MODELO MUNICIPIO
    await modeloMunicipio.sync().then(()=>{
        console.log("Modelo Municipio creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo municipio " + e);
    });

    // CREANDO MODELO CIUDAD
    await modeloCiudad.sync().then(()=>{
        console.log("Modelo Ciudad creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo ciudad " + e);
    });

    // CRENDO MODELO BARRIO
    await modeloBarrio.sync().then(()=>{
        console.log("Modelo Barrio creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo barrio " + e);
    });

    // CRAENDO MODELO CLIENTE
    await modeloCliente.sync().then(()=>{
        console.log("Modelo Cliente creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo cliente " + e);
    });

    // CRANDO MODELO CLIENTE DIRECCION
    await modeloClienteDireccion.sync().then(()=>{
        console.log("Modelo ClienteDireccion creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo ClienteDireccion " + e);
    });

    // CREANDO MODELO CLIENTE TELEFONO
    await modeloClienteTelefono.sync().then(()=>{
        console.log("Modelo ClienteTelefono creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo ClienteTelefono " + e);
    });
}