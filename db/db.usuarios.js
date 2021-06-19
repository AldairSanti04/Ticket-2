const {DataTypes, Model, Sequelize} = require('sequelize')
const sequelize = require('./conexion')

//Definir mi Modelo con que voy a trabajar
const Usuarios = sequelize.define('usuarios', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombres : {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        args: true,
        msg: 'Ya se encuentra registrado su correo'
      }
    },
    pass: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    nacimiento: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    pais: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    ciudad: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    foto: {
        type: DataTypes.BLOB('long'),
        allowNull: true
    },
  },{
    timestamps: true
})

module.exports = Usuarios;