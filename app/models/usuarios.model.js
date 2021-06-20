const Usuarios = require('../../db/db.usuarios');
const Habilidades = require('../../db/db.habilidadesBlandas');
const Conocimientos = require('../../db/db.conocimientos');
const Desempenios = require('../../db/db.desempenios');

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
            ciudad: this.ciudad,
            foto: this.foto
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

  static agregarHabilidadBlanda = async (id, array) => {
    try {
      array.habilidades.forEach( async element => {
        await Habilidades.findOrCreate({
          where: {
              habilidad: element.habilidad, 
              tecler_id: id
          }
      })
      });
    return true
    } catch (error) {
      throw new Error ('No se pudo agregar la habilidad')
    }
  }

  static validarHabilidadBlanda = async (id, habilidad) => {
    try {
      let existe = await Habilidades.findOne({ where: { habilidad: habilidad.habilidad, tecler_id: id } })
      if(!existe){
        throw new Error ('No se pudo validar la habilidad, no existe')
      } else {
        existe.validado++;
        existe.save();
        return true
      }
    } catch (error) {
      throw new Error ('No se pudo validar la habilidad, no existe')
    }
  }

  static agregarConocimientos = async (id, array) => {
    try {
      array.conocimientos.forEach( async element => {
        await Conocimientos.findOrCreate({
          where: {
              conocimiento: element.conocimiento, 
              tecler_id: id
          }
      })
      });
    return true
    } catch (error) {
      throw new Error ('No se pudo agregar la habilidad')
    }
  }

  static validarConocimientos = async (id, conocimiento) => {
    try {
      let existe = await Conocimientos.findOne({ where: { conocimiento: conocimiento.conocimiento, tecler_id: id } })
      if(!existe){
        throw new Error ('No se pudo validar el conocimiento, no existe')
      } else {
        existe.validado++;
        existe.save();
        return true
      }
    } catch (error) {
      throw new Error ('No se pudo validar el conocimiento, no existe')
    }
  }

  static agregarActividades = async (id, array) => {
    try {
      array.actividades.forEach( async element => {
        await Desempenios.findOrCreate({
          where: {
              actividad: element.actividad, 
              tecler_id: id
          }
        })
      });
    return true
    } catch (error) {
      throw new Error ('No se pudo agregar la actividads')
    }
  }

  static validarActividades = async (id, actividad) => {
    try {
      let existe = await Desempenios.findOne({ where: { actividad: actividad.actividad, tecler_id: id } })
      if(!existe){
        throw new Error ('No se pudo validar el conocimiento, no existe')
      } else {
        existe.validado++;
        existe.save();
        return true
      }
    } catch (error) {
      throw new Error ('No se pudo validar el desempeño en la actividad, no existe')
    }
  }
}