const {DataTypes, Model} = require('sequelize')
const sequelize = require('./conexion')

//Definir mi Modelo con que voy a trabajar
const Sociales = sequelize.define('redes_sociales', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    red_social : {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    enlace : {
        type: DataTypes.STRING(300),
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

module.exports = Sociales;