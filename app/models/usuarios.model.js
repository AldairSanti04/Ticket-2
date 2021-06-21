const sequelize = require('../../db/conexion');
const Usuarios = require('../../db/db.usuarios');
const Habilidades = require('../../db/db.habilidadesBlandas');
const Conocimientos = require('../../db/db.conocimientos');
const Desempenios = require('../../db/db.desempenios');
const Entornos = require('../../db/db.entornosProfesionales');
const Tecnologias = require('../../db/db.tecnologias');
const Desempenio = require('../../db/db.desempenios');
const Estudios = require('../../db/db.estudios');
const Idiomas = require('../../db/db.idiomas');
const Redes = require('../../db/db.redesSociales');
const Hobbies = require('../../db/db.hobbies');
const Feedback = require('../../db/db.feedback');
const Amigos = require('../../db/db.amigos');

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

  actualizarUsuarioFoto = async (id) => {        
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

  static listarUsuarios = async () => {
    try{
      let resultado = await Usuarios.findAll({
        attributes: ['id', 'nombres', 'apellidos', 'foto']
      })
      return resultado
    } catch(error) {

    }
  }

  static infoUsuario = async (id) => {
    try{
      let resultado = await Usuarios.findOne({
        where: { id : id },
        attributes: ['id', 'nombres', 'apellidos', 'email', 'nacimiento', 'pais', 'ciudad', 'foto'],
        include: [                                                        
          {
            model: Hobbies,
            attributes: ['hobbie'],                        
          },
          {
            model: Redes,
            attributes: ['red_social', 'enlace'],                        
          },
          {
            model: Idiomas,
            attributes: ['idioma', 'nivel'],                        
          },
          {
            model: Estudios,
            attributes: ['escuela', 'especialidad'],                        
          },
          {
            model: Habilidades,
            attributes: ['id', 'habilidad', 'validado'],                        
          },
          {
            model: Desempenio,
            attributes: ['id', 'actividad', 'validado'],                        
          },
          {
            model: Entornos,
            attributes: ['id', 'entorno', 'validado'],                        
          },
          {
            model: Tecnologias,
            attributes: ['id', 'tecnologia', 'validado'],                        
          },
          {
            model: Conocimientos,
            attributes: ['id', 'conocimiento', 'validado'],                        
          }
        ]
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

  static validarHabilidadBlanda = async (id) => {
    try {
      let existe = await Habilidades.findOne({ where: { id: id } })
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

  static validarConocimientos = async (id) => {
    try {
      let existe = await Conocimientos.findOne({ where: { id: id } })
      if(!existe){
        throw new Error ('No se pudo validar el conocimiento, no existe')
      } else {
        existe.validado++;
        existe.save();
        return true
      }
    } catch (error) {
      throw new Error ('No se pudo validar el conocimiento, algo salio mal')
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

  static validarActividades = async (id) => {
    try {
      let existe = await Desempenios.findOne({ where: { id: id } })
      if(!existe){
        throw new Error ('No se pudo validar el desempeño en la actividad, no existe')
      } else {
        existe.validado++;
        existe.save();
        return true
      }
    } catch (error) {
      throw new Error ('No se pudo validar el desempeño en la actividad, algo salio mal')
    }
  }

  static agregarEntornosP = async (id, array) => {
    try {
      array.entornos.forEach( async element => {
        await Entornos.findOrCreate({
          where: {
              entorno: element.entorno, 
              tecler_id: id
          }
        })
      });
    return true
    } catch (error) {
      throw new Error ('No se pudo agregar el entorno profesional')
    }
  }

  static validarEntornoP = async (id) => {
    try {
      let existe = await Entornos.findOne({ where: { id: id } })
      if(!existe){
        throw new Error ('No se pudo validar el entorno profesional, no existe')
      } else {
        existe.validado++;
        existe.save();
        return true
      }
    } catch (error) {
      throw new Error ('No se pudo validar el entorno profesional, algo salio mal')
    }
  }

  static agregarTecno = async (id, array) => {
    try {
      array.tecnologias.forEach( async element => {
        await Tecnologias.findOrCreate({
          where: {
              tecnologia: element.tecnologia, 
              tecler_id: id
          }
        })
      });
    return true
    } catch (error) {
      throw new Error ('No se pudo agregar la tecnologia')
    }
  }

  static validarTecno = async (id) => {
    try {
      let existe = await Tecnologias.findOne({ where: { id: id } })
      if(!existe){
        throw new Error ('No se pudo validar la tecnologia, no existe')
      } else {
        existe.validado++;
        existe.save();
        return true
      }
    } catch (error) {
      throw new Error ('No se pudo validar la tecnologia, algo salio mal')
    }
  }

  static agregarEscuela = async (id, array) => {
    try {
      array.estudios.forEach( async element => {
        await Estudios.findOrCreate({
          where: {
              escuela: element.escuela, 
              especialidad: element.especialidad,
              tecler_id: id
          }
        })
      });
    return true
    } catch (error) {
      throw new Error ('No se pudo agregar la escuela')
    }
  }

  static agregarLenguaje = async (id, array) => {
    try {
      array.idiomas.forEach( async element => {
        await Idiomas.findOrCreate({
          where: {
              idioma: element.idioma, 
              nivel: element.nivel,
              tecler_id: id
          }
        })
      });
    return true
    } catch (error) {
      throw new Error ('No se pudo agregar la escuela')
    }
  }

  static agregarSociales = async (id, array) => {
    try {
      array.redes.forEach( async element => {
        await Redes.findOrCreate({
          where: {
              red_social: element.red, 
              enlace: element.enlace,
              tecler_id: id
          }
        })
      });
    return true
    } catch (error) {
      throw new Error ('No se pudo agregar la red Social')
    }
  }

  static agregarPasatiempos = async (id, array) => {
    try {
      array.hobbies.forEach( async element => {
        await Hobbies.findOrCreate({
          where: {
              hobbie: element.hobbie, 
              tecler_id: id
          }
        })
      });
    return true
    } catch (error) {
      throw new Error ('No se pudo agregar el Hobbie')
    }
  }

  static agregarComentario = async (id_tecler, feed) => {
    try {
        await Feedback.create({
            tecler_amigo_id: feed.id,
            comentario: feed.comentario, 
            tecler_id: id_tecler
        })
    return true
    } catch (error) {
      throw new Error ('No se pudo agregar el comentario')
    }
  }

  static solicitarAmistad = async (id_tecler, amigo) => {
    try {
        await Amigos.findOrCreate({
          where: {
              tecler_amigo_id: amigo.id,
              aceptado: false, 
              tecler_id: id_tecler
          }
        })
    return true
    } catch (error) {
      throw new Error ('No se pudo agregar la solicitud')
    }
  }

  static listarAmigos = async (id) => {
    try {
        // let resultado = await Amigos.findAll({
        //   where: { aceptado: true, tecler_id: id },
        //   attributes: ['tecler_amigo_id'],
        //   include: [
        //     {
        //       model: Usuarios,
        //       require: true,
        //       foreignKey: 'tecler_amigo_id',
        //       attributes: ['nombres', 'apellidos'],
        //     }
        //   ]
        // })
      let data = [id]
      let resultado = await sequelize.query(`SELECT dbo.usuarios.id, dbo.usuarios.nombres, dbo.usuarios.apellidos FROM dbo.amigos INNER JOIN dbo.usuarios ON tecler_amigo_id = usuarios.id WHERE aceptado = 'true' AND tecler_id = ? `,
      {replacements : data, type : sequelize.QueryTypes.SELECT})
    return resultado
    } catch (error) {
      throw new Error ('No se pudo agregar la solicitud')
    }
  }

  static listarComentarios = async (id) => {
    try {
      let data = [id]
      let resultado = await sequelize.query(`SELECT dbo.usuarios.id, dbo.usuarios.nombres, dbo.usuarios.apellidos, dbo.feedbacks.comentario FROM dbo.feedbacks INNER JOIN dbo.usuarios ON tecler_amigo_id = usuarios.id WHERE tecler_id = ? `,
      {replacements : data, type : sequelize.QueryTypes.SELECT})
    return resultado
    } catch (error) {
      throw new Error ('No se pudo agregar la solicitud')
    }
  }
}