const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./db/conexion');
// Modelos DB
const Usuarios = require('./db/db.usuarios');
const Conocimientos = require('./db/db.conocimientos');
const Habilidades = require('./db/db.habilidadesBlandas');
const Desempenio = require('./db/db.desempenios');
const Idiomas = require('./db/db.idiomas');
const Estudios = require('./db/db.estudios');
const Feedback = require('./db/db.feedback');
const Entornos = require('./db/db.entornosProfesionales');
const Hobbies = require('./db/db.hobbies');
const Redes = require('./db/db.redesSociales');
const Tecnologias = require('./db/db.tecnologias');
const Amigos = require('./db/db.amigos');
// Vistas
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
        // await Usuarios.sync({alter:true});
        // await Conocimientos.sync({force:true});
        // await Amigos.sync({alter:true});
        // await Habilidades.sync({force:true});
        // await Hobbies.sync({alter:true});
        // await Entornos.sync({force:true});
        // await Estudios.sync({alter:true});
        // await Tecnologias.sync({force:true});
        // await Redes.sync({alter:true});
        // await Feedback.sync({alter:true});
        // await Idiomas.sync({alter:true});
        // await Desempenio.sync({force:true});

        await Usuarios.sync();
        await Conocimientos.sync();
        await Amigos.sync();
        await Habilidades.sync();
        await Hobbies.sync();
        await Entornos.sync();
        await Estudios.sync();
        await Tecnologias.sync();
        await Redes.sync();
        await Feedback.sync();
        await Idiomas.sync();
        await Desempenio.sync();

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