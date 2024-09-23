const express = require('express');
const morgan = require('morgan');

const app = express();
app.set('port', 3001);
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.get('/', (req,res)=>{
    res.send("Hola Mundo");
});

app.get('/otra', (req,res)=>{
    var info = {
        nombre: "Cristian",
        apellido: "Miranda",
        clase: {
            codigo: "IF3algo",
            nombre: "Seminario Taller de Software"
        }
    }
    res.json(info);
});

app.get('/otra2', (req,res)=>{
    var info = {
        nombre: "Cristian",
        apellido: "Miranda",
        clase: {
            codigo: "IF3algo",
            nombre: "Seminario Taller de Software"
        }
    }
    res.json({clase: info.clase.codigo + ' ' + info.clase.nombre});
});

app.listen(app.get('port'), ()=>{
    console.log('Servidor iniciado en el puerto ' + app.get('port'));
});