const {DataTypes, Model} = require('sequelize')
const sequelize = require('./conexion')

//Definir mi Modelo con que voy a trabajar
const Tecnologias = sequelize.define('tecnologias', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tecnologia : {
        type: DataTypes.STRING(150),
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

module.exports = Tecnologias;