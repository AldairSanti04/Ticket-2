const {DataTypes, Model, Sequelize} = require('sequelize')
const sequelize = require('./conexion')

//Definir mi Modelo con que voy a trabajar
const Habilidades = sequelize.define('habilidades_blandas', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    habilidad : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    validado : {
        type: Sequelize.INTEGER,
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

module.exports = Habilidades;