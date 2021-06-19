const {DataTypes, Model} = require('sequelize')
const sequelize = require('./conexion')

//Definir mi Modelo con que voy a trabajar
const Feedback = sequelize.define('feedback', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tecler_amigo_id : {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuarios',
            key: 'id'
        },
        allowNull: false     
    },
    comentario : {
        type: DataTypes.STRING(500),
        allowNull: false,
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

module.exports = Feedback;