const {DataTypes, Model} = require('sequelize')
const sequelize = require('./conexion')

//Definir mi Modelo con que voy a trabajar
const Desempenio = sequelize.define('desempenio', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    actividad : {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    validado : {
        type: DataTypes.INTEGER,
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

module.exports = Desempenio;