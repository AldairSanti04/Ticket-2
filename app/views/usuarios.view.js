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

    // Recuperar la información de un Usuario por ID
    app.get('/usuario/:id', async (req, res) => {
        let data = req.params.id;
        try{
            let resultado = await controladorUsuarios.buscarUsuario(data);
            let imagencita = resultado.foto.toString('base64')
            res.json({result:resultado, foto:imagencita});
        }catch (err){
            res.status(400).json('No se puede mostrar usuario')
        }
    })

    // Modificar datos de un Usuario por ID
    app.post('/usuario/:id', middImages, async (req, res) => {
        let id = req.params.id;
        let imagen = fs.readFileSync("uploads/" + req.file.filename);
        let user = req.body;
        try {
            let resultado = await controladorUsuarios.updateUsuario(id, imagen, user);
                res.json({ user: resultado })
        }catch (err){
            res.status(400).json({ error: err.message}) 
        }
    })

    // Eliminar un Usuario por ID
    app.delete('/delete/:id', async (req,res)=>{
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
        let habilidad = req.body;
        try {
            let resultado = await controladorUsuarios.validarHabilidad(id, habilidad)
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
        let conocimiento = req.body;
        try {
            let resultado = await controladorUsuarios.validarConocimiento(id, conocimiento)
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
        let desempenio = req.body;
        try {
            let resultado = await controladorUsuarios.validarDesempenio(id, desempenio)
            if(resultado){
                res.status(200).json('ok');
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se pudo validar"})
        }
    })
}