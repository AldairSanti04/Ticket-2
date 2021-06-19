const Usuarios = require('../../db/db.usuarios');

module.exports = class ModelUsers {
  constructor(nombres, apellidos, email, pass, nacimiento, pais, ciudad, foto) {        
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.email = email;
    this.pass = pass;
    this.nacimiento = nacimiento;
    this.pais = pais;
    this.ciudad = ciudad;
    this.foto = foto;
  }

  registrarNuevoUsuario = async () => {
    let existeUsuario = await this.existenciaDeUsuario();
    if(existeUsuario)
        throw new Error('Ya se encuentra registrado');
    else {
        try {
            await Usuarios.create({    
              nombres: this.nombres,
              apellidos: this.apellidos,
              email: this.email,
              pass: this.pass,
              nacimiento: this.nacimiento,
              pais: this.pais,
              ciudad: this.ciudad
            });
            return true
        } catch (err){
            throw new Error('No se pudo registrar usuario')
        }
    }
  }

  existenciaDeUsuario = async ()=>{
    //chequear con la base de datos que exista el usuario
    let resultado = await Usuarios.findOne({where: {email: this.email}})
    if (resultado === null){
        return false
    }else {
        return true
    }
  }

  usuarioAutenticado = async ()=>{
    //chequear con la base de datos que exista el usuario y la contraseña sea
    let resultado = await Usuarios.findOne({where: {email: this.email, pass: this.pass}})
    if (resultado === null){
        return false
    }else {
        return resultado
    }
  }

  actualizarUsuario = async (id) => {        
    try {
      let modificado = await Usuarios.findOne({where: {id: id}})
      if(modificado != null)
      {
        await Usuarios.update({
            nombres: this.nombres,
            apellidos: this.apellidos,
            email: this.email,
            pass: this.pass,
            nacimiento: this.nacimiento,
            pais: this.pais,
            ciudad: this.ciudad
        }, 
          {where: { id : id}})
          let usuarioModificado = await Usuarios.findOne({where: {id: id}})
        return usuarioModificado;
      }
    } catch (error) {
      throw new Error ('No se pudo actualizar')
    }        
  }

  static infoUsuario = async (id) => {
    try{
      let resultado = await Usuarios.findOne({
        where: { id : id }
      })
      return resultado
    }catch (err) {
      throw new Error ('No existe el usuario');
    }
  }

  static deleteUser = async (id) => {
    try {
        await Usuarios.destroy({
            where: { id : id}
        })
        return true;
      } catch (err){
        throw new Error ('No se pudo eliminar el usuario seleccionado')
    }
  }
}