const ModelUsers = require('../models/usuarios.model');
const jwt = require('jsonwebtoken');

//Exportar mis modulos
module.exports.generaToken = async (data)=>{
    try {
        let resultado = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data
        }, process.env.SECRET_KEY
        )
        return resultado
    }catch (err){
        console.log(err)
        throw new Error (err)
    }
}

module.exports.chequearUsuario = async (user)=>{
    const {email, pass} = user;
    let usuario = new ModelUsers('', '', email, pass, '', '', '', '');
    try {
        let resultado =  await usuario.existenciaDeUsuario();
        if (resultado) {
            let result =  await usuario.usuarioAutenticado();
            return result
        }else {
            throw new Error ('Contraseña Incorrecta');
        }
    }catch (err){
        throw new Error ('No existe el usuario');
    }
}

module.exports.registroNuevoUsuario = async (user) => {
    const { nombres, apellidos, email, pass, nacimiento, pais, ciudad  } = user;
    let nuevoUsuario = new ModelUsers(nombres, apellidos, email, pass, nacimiento, pais, ciudad, ''); 
    try {
        let resultado = await nuevoUsuario.registrarNuevoUsuario();
        if(resultado){
            let result =  await nuevoUsuario.usuarioAutenticado();
            return result;
        } else {
            throw new Error ('No se pudo crear el usuario');
        }
    } catch (error) {
        throw error;
    }  
}

//Seleccionar un solo usuario por ID
module.exports.buscarUsuario = async (data)=>{
    try {
        let resultado = await ModelUsers.infoUsuario(data);
        let result = resultado.dataValues;
        return result;
    }catch (err) {
        throw new Error ('Ocurrio un problema en el controlador al BUSCAR usuario')
    }
}

module.exports.updateUsuario = async (id, user) => {
    const { nombres, apellidos, email, pass, fecha, pais, ciudad, foto } = user;
    let usuarioActualizar = new ModelUsers(nombres, apellidos, email, pass, fecha, pais, ciudad, ''); 
    try {
        let resultado =  await usuarioActualizar.actualizarUsuario(id);
        let result = resultado.dataValues;
        return result;
    }catch (err){
        throw new Error ('No existe el usuario actualizar');
    }
}

module.exports.eliminarUsuario = async (id) => {
    try {
        let result = await ModelUsers.deleteUser(id)
        return true;
    }catch (err){
        throw new Error ('No se pudo eliminar el usuario seleccionado')
    }
};