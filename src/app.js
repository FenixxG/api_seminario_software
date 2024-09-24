const express = require('express');
const morgan = require('morgan');
const db = require('./configuracion/db');
const modeloCargo = require('./modelos/cargo');

db.authenticate()
.then( async (data) => {
    console.log("Conexion establecida");
    await modeloCargo.sync().then((da) => {
        console.log("Modelo Cargo Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo cargo " + e);
    })
})
.catch((er) => {
    console.log("ERROR: " + er);
});
const app = express();
app.set('port', 3001);
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api', require('./rutas')); //usando archivo aparte que se encarga solo de las rutas

app.listen(app.get('port'), ()=>{
    console.log('Servidor iniciado en el puerto ' + app.get('port'));
});