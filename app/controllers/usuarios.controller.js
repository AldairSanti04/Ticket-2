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

module.exports.updateUsuario = async (id, imagen, user) => {
    const { nombres, apellidos, email, pass, fecha, pais, ciudad} = user;
    const foto = imagen;
    let usuarioActualizar = new ModelUsers(nombres, apellidos, email, pass, fecha, pais, ciudad, foto); 
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

module.exports.agregarHabilidad = async (id, habilidad) => {
    try {
        let result = await ModelUsers.agregarHabilidadBlanda(id, habilidad);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo agregar la habilidad');
    }
}

module.exports.validarHabilidad = async (id, habilidad) => {
    try {
        let result = await ModelUsers.validarHabilidadBlanda(id, habilidad);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo validar la habilidad');
    }
}

module.exports.agregarConocimiento = async (id, conocimiento) => {
    try {
        let result = await ModelUsers.agregarConocimientos(id, conocimiento);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo agregar el conocimiento');
    }
}

module.exports.validarConocimiento = async (id, conocimiento) => {
    try {
        let result = await ModelUsers.validarConocimientos(id, conocimiento);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo validar el conocimiento');
    }
}

module.exports.agregarDesempenio = async (id, desempenio) => {
    try {
        let result = await ModelUsers.agregarActividades(id, desempenio);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo agregar el desempeño');
    }
}

module.exports.validarDesempenio = async (id, desempenio) => {
    try {
        let result = await ModelUsers.validarActividades(id, desempenio);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo validar el desempeño');
    }
}

module.exports.agregarEntornos = async (id, entorno) => {
    try {
        let result = await ModelUsers.agregarEntornosP(id, entorno);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo agregar el desempeño');
    }
}

module.exports.validarEntorno = async (id, entorno) => {
    try {
        let result = await ModelUsers.validarEntornoP(id, entorno);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo validar el desempeño');
    }
}

module.exports.agregarTecnologias = async (id, tecnologia) => {
    try {
        let result = await ModelUsers.agregarTecno(id, tecnologia);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo agregar la tecnologia');
    }
}

module.exports.validarTecnologia = async (id, tecnologia) => {
    try {
        let result = await ModelUsers.validarTecno(id, tecnologia);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo validar la tecnologia');
    }
}

module.exports.agregarEstudios = async (id, estudios) => {
    try {
        let result = await ModelUsers.agregarEscuela(id, estudios);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo agregar la tecnologia');
    }
}

module.exports.agregarIdiomas = async (id, idiomas) => {
    try {
        let result = await ModelUsers.agregarLenguaje(id, idiomas);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo agregar el idioma');
    }
}

module.exports.agregarRedes = async (id, redes) => {
    try {
        let result = await ModelUsers.agregarSociales(id, redes);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo agregar la red social');
    }
}

module.exports.agregarHobbies = async (id, hobbie) => {
    try {
        let result = await ModelUsers.agregarPasatiempos(id, hobbie);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo agregar la red social');
    }
}

module.exports.agregarFeedback = async (id_tecler, comentario) => {
    try {
        let result = await ModelUsers.agregarComentario(id_tecler, comentario);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo agregar el feedback');
    }
}

module.exports.agregarAmigo = async (id_tecler, amigo) => {
    try {
        let result = await ModelUsers.solicitarAmistad(id_tecler, amigo);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo hacer la solicitud');
    }
}