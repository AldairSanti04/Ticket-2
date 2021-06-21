const Joi = require('joi')
const validaciones = require('./checarDatos');

const validarLogin = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.modeloLogin, 'Los datos ingresados no son correctos para el login')
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const validarRegistro = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.modeloRegistro, 'Los datos ingresados no son correctos para realizar el registro');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const validarActualizacion = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.modeloActualizar, 'Los datos ingresados no son correctos para actualizar sus datos');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const validarHabilidades = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.modeloHabilidades, 'Los datos ingresados no son correctos para agregar Habilidades Blandas');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const validarTecnologias = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.modeloTecnologias, 'Los datos ingresados no son correctos para agregar Tecnologias');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const validarEntorno = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.modeloEntornos, 'Los datos ingresados no son correctos para agregar Entornos Profesionales');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const validarConocimientos = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.modeloConocimientos, 'Los datos ingresados no son correctos para agregar Conocimientos');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const validarDesempenios = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.modeloDesempenios, 'Los datos ingresados no son correctos para agregar Desempeños');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const validarRedesSociales = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.modeloRedes, 'Los datos ingresados no son correctos para agregar Redes Sociales');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const validarHobbies = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.modeloHobbies, 'Los datos ingresados no son correctos para agregar Hobbies');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const validarEstudios = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.modeloEstudios, 'Los datos ingresados no son correctos para agregar Estudios');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const validarIdiomas = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.modeloIdiomas, 'Los datos ingresados no son correctos para agregar Idiomas');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

module.exports = {
    validarLogin,
    validarRegistro,
    validarActualizacion,
    validarConocimientos,
    validarDesempenios,
    validarEntorno,
    validarEstudios,
    validarIdiomas,
    validarRedesSociales,
    validarTecnologias,
    validarHabilidades,
    validarHobbies
}