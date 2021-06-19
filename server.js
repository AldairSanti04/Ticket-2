const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./db/conexion');
const multer = require('multer');
const Usuarios = require('./db/db.usuarios');
const vistasUsuarios = require('./app/views/usuarios.view');

app.use(express.json());
app.use(cors());
//app.use(midd.limiter);

//middleware para captura de errores globales.
app.use((err, req, res, next)=> {
    console.log(err);
    if (!err){
        return next();
    }
    return res.status(500).json('Se produjo un error inesperado, intente nuevamente')
});

//Iniciar el Servidor
async function inicioServidor() {
    try {
        await Usuarios.sync({alter:true});
        // await Usuarios.findOrCreate({
        //     where: {
        //         nombres: 'Aldair', 
        //         apellidos: 'Santiago', 
        //         email: 'aldair@admin.com', 
        //         pass: 'holitas123', 
        //         nacimiento: '1998-04-27',
        //         pais: 'México',
        //         ciudad: 'Estado de México'
        //     }
        // })
        await sequelize.authenticate();
        console.log('Conexion con la DB correcta!');
        app.listen(process.env.PORT, function (){
            console.log(`Sistema iniciado en el puerto ${process.env.PORT}`);
        })
    }catch (err){
        console.log('No se pudo conectar con la DB');
    }
}

inicioServidor();

vistasUsuarios(app);