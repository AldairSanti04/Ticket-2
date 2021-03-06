const {DataTypes, Model, Sequelize} = require('sequelize')
const sequelize = require('./conexion')

//Definir mi Modelo con que voy a trabajar
const Conocimientos = sequelize.define('conocimientos', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    conocimiento : {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    validado : {
        type: Sequelize.INTEGER,
        allowNull: false,
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

module.exports = Conocimientos;