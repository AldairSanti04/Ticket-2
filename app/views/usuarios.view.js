const controladorUsuarios = require('../controllers/usuarios.controller');
const fs = require("fs");
const middImages = require('../../middleware/middImages');
const middAuth = require('../../middleware/middAuth');

module.exports = async (app)=> {

    //Ruta para Login
    app.post('/login', async (req,res)=>{
        let usuario = req.body
        try {
            let resultado = await controladorUsuarios.chequearUsuario(usuario)
            if (resultado != false){
                let tokenResult = await controladorUsuarios.generaToken(usuario)
                res.status(200).json({ token: tokenResult, user: resultado })
            }else {
                throw new Error ("Contraseña Incorrecta")
            }
        }catch (err){
            res.status(400).json({ error: err.message}) 
        }
    })

    //Registro de Nuevo Usuario
    app.post('/signup', async (req,res)=>{
        let usuario = req.body
        try {
            let resultado = await controladorUsuarios.registroNuevoUsuario(usuario)
            if (resultado != false){
                let tokenResult = await controladorUsuarios.generaToken(usuario)
                res.json({ token: tokenResult, user: resultado })
            }else {
                throw new Error ("Contraseña Incorrecta")
            }
        }catch (err){
            res.status(400).json({ error: err.message}) 
        }
    })

    // Recuperar info de todos los usuarios amigos
    app.get('/usuarios', middAuth.authorizationUser, async (req, res) => {
        try{
            let resultado = await controladorUsuarios.buscarUsuarios();
            resultado.forEach(element => {
                if(element.foto != null){
                    element.foto = element.foto.toString('base64');
                }
            });
            res.status(200).json({user:resultado});
        }catch (err){
            res.status(400).json('No se puede mostrar usuario')
        }
    })

    // Recuperar la información de un Usuario por ID
    app.get('/usuario/:id', middAuth.authorizationUser, async (req, res) => {
        let data = req.params.id;
        try{
            let resultado = await controladorUsuarios.buscarUsuario(data);
            if(resultado.foto != null){
                let imagencita = resultado.foto.toString('base64')
                res.status(200).json({user:resultado, foto:imagencita});
            } else {
                res.status(200).json({user:resultado});
            }

        }catch (err){
            res.status(400).json('No se puede mostrar usuario')
        }
    })

    // Modificar datos de un Usuario por ID
    app.post('/usuario/:id', middImages, async (req, res) => {
        let id = req.params.id;
        let imagen;
        let hayFoto = req.file
        if(hayFoto == undefined){
            imagen = null
        } else {
            imagen = fs.readFileSync("uploads/" + req.file.filename);
        }
        let user = req.body;
        try {
            let resultado = await controladorUsuarios.updateUsuario(id, imagen, user);
                res.json({ user: resultado })
        }catch (err){
            res.status(400).json({ error: err.message}) 
        }
    })

    // Eliminar un Usuario por ID
    app.delete('/delete/:id', middAuth.authorizationUser, async (req,res)=>{
        let data = req.params.id;
        try {
            let resultado = await controladorUsuarios.eliminarUsuario(data)
            if(resultado){
                res.status(200).json('ok');
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se pudo eliminar"})
        }
    })

    // Agregar Nueva Habilidad Blanda
    app.post('/habilidadBlanda/:id', async (req, res) => {
        let id = req.params.id;
        let habilidad = req.body;
        try {
            let resultado = await controladorUsuarios.agregarHabilidad(id, habilidad)
            if(resultado){
                res.status(200).json('ok');
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se pudo agregar"})
        }
    })

    // Amigo Valida habilidad blanda
    app.post('/validar/habilidadBlanda/:id', async (req, res) => {
        let id = req.params.id;
        try {
            let resultado = await controladorUsuarios.validarHabilidad(id)
            if(resultado){
                res.status(200).json('ok');
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se pudo validar"})
        }
    })

    // Agregar Nuevo Conocimientos
    app.post('/conocimientos/:id', async (req, res) => {
        let id = req.params.id;
        let conocimiento = req.body;
        try {
            let resultado = await controladorUsuarios.agregarConocimiento(id, conocimiento)
            if(resultado){
                res.status(200).json('ok');
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se pudo agregar"})
        }
    })

    // Amigo Valida Conocimientos
    app.post('/validar/conocimientos/:id', async (req, res) => {
        let id = req.params.id;
        try {
            let resultado = await controladorUsuarios.validarConocimiento(id)
            if(resultado){
                res.status(200).json('ok');
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se pudo validar"})
        }
    })

        // Agregar Desempeños
    app.post('/desempenio/:id', async (req, res) => {
        let id = req.params.id;
        let desempenio = req.body;
        try {
            let resultado = await controladorUsuarios.agregarDesempenio(id, desempenio)
            if(resultado){
                res.status(200).json('ok');
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se pudo agregar"})
        }
    })

    // Amigo Valida desempenio
    app.post('/validar/desempenio/:id', async (req, res) => {
        let id = req.params.id;
        try {
            let resultado = await controladorUsuarios.validarDesempenio(id)
            if(resultado){
                res.status(200).json('ok');
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se pudo validar"})
        }
    })

    // Agregar Entornos Profesionales
    app.post('/entornos/:id', async (req, res) => {
        let id = req.params.id;
        let entornos = req.body;
        try {
            let resultado = await controladorUsuarios.agregarEntornos(id, entornos)
            if(resultado){
                res.status(200).json('ok');
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se pudo agregar"})
        }
    })

    // Amigo Valida Entorno Profesional
    app.post('/validar/entorno/:id', async (req, res) => {
        let id = req.params.id;
        try {
            let resultado = await controladorUsuarios.validarEntorno(id)
            if(resultado){
                res.status(200).json('ok');
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se pudo validar"})
        }
    })

        // Agregar Tecnologias
    app.post('/tecnologias/:id', async (req, res) => {
        let id = req.params.id;
        let tecnologia = req.body;
        try {
            let resultado = await controladorUsuarios.agregarTecnologias(id, tecnologia)
            if(resultado){
                res.status(200).json('ok');
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se pudo agregar"})
        }
    })

        // Amigo Valida Tecnologias
    app.post('/validar/tecnologia/:id', async (req, res) => {
        let id = req.params.id;
        try {
            let resultado = await controladorUsuarios.validarTecnologia(id)
            if(resultado){
                res.status(200).json('ok');
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se pudo validar"})
        }
    })

    // Ruta para Estudios
    app.post('/estudios/:id', async (req, res) => {
        let id = req.params.id;
        let estudios = req.body;
        try {
            let resultado = await controladorUsuarios.agregarEstudios(id, estudios)
            if(resultado){
                res.status(200).json('ok');
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se pudo agregar"})
        }
    })

    // Ruta para Idiomas
    app.post('/idiomas/:id', async (req, res) => {
        let id = req.params.id;
        let idiomas = req.body;
        try {
            let resultado = await controladorUsuarios.agregarIdiomas(id, idiomas)
            if(resultado){
                res.status(200).json('ok');
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se pudo agregar"})
        }
    })

    // Ruta para Redes Sociales
    app.post('/redes/:id', async (req, res) => {
        let id = req.params.id;
        let redes = req.body;
        try {
            let resultado = await controladorUsuarios.agregarRedes(id, redes)
            if(resultado){
                res.status(200).json('ok');
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se pudo agregar"})
        }
    })

    // Ruta para Hobbies
    app.post('/hobbies/:id', async (req, res) => {
        let id = req.params.id;
        let hobbies = req.body;
        try {
            let resultado = await controladorUsuarios.agregarHobbies(id, hobbies)
            if(resultado){
                res.status(200).json('ok');
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se pudo agregar"})
        }
    })

    // Rutas para Feedback
    app.post('/feedback/:id', async (req, res) => {
        let id_tecler = req.params.id;
        let comentario = req.body;
        try {
            let resultado = await controladorUsuarios.agregarFeedback(id_tecler, comentario)
            if(resultado){
                res.status(200).json('ok');
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se pudo agregar"})
        }
    })

    app.get('/feedback/:id', async (req, res) => {
        let id_tecler = req.params.id;
        try {
            let resultado = await controladorUsuarios.verComentarios(id_tecler)
            if(resultado){
                res.status(200).json(resultado);
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se pudo agregar"})
        }
    })

    // Rutas para Amigos
    app.post('/solicitud/:id', async (req, res) => {
        let id_tecler = req.params.id;
        let amigo = req.body;
        try {
            let resultado = await controladorUsuarios.agregarAmigo(id_tecler, amigo)
            if(resultado){
                res.status(200).json('ok');
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se pudo agregar"})
        }
    })

    app.get('/amigos/:id', async (req, res) => {
        let id = req.params.id;
        try {
            let resultado = await controladorUsuarios.verAmigos(id)
            if(resultado){
                res.status(200).json(resultado);
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se puede mostrar"})
        }
    })
}