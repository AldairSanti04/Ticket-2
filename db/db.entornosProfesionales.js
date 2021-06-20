const {DataTypes, Model, Sequelize} = require('sequelize')
const sequelize = require('./conexion')

//Definir mi Modelo con que voy a trabajar
const Entornos = sequelize.define('entornos_profesionales', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    entorno : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    validado : {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    tecler_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuarios',
            key: 'id'
        },
        allowNull: false        
    },
  },{
    timestamps: false
})

module.exports = Entornos;