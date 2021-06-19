const {DataTypes, Model, Sequelize} = require('sequelize');
const sequelize = require('./conexion');
const Conocimientos = require('./db.conocimientos');
const Habilidades = require('./db.habilidadesBlandas');
const Desempenio = require('./db.desempenios');
const Idiomas = require('./db.idiomas');
const Estudios = require('./db.estudios');
const Feedback = require('./db.feedback');
const Entornos = require('./db.entornosProfesionales');
const Hobbies = require('./db.hobbies');
const Redes = require('./db.redesSociales');
const Tecnologias = require('./db.tecnologias');
const Amigos = require('./db.amigos');

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

Usuarios.hasMany(Conocimientos, {
  foreignKey: {
      name: 'tecler_id',
      type: DataTypes.INTEGER,
      allowNull: false
  },
  onDelete: 'CASCADE'
});

Usuarios.hasMany(Habilidades, {
  foreignKey: {
      name: 'tecler_id',
      type: DataTypes.INTEGER,
      allowNull: false
  },
  onDelete: 'CASCADE'
});

Usuarios.hasMany(Desempenio, {
  foreignKey: {
      name: 'tecler_id',
      type: DataTypes.INTEGER,
      allowNull: false
  },
  onDelete: 'CASCADE'
});

Usuarios.hasMany(Idiomas, {
  foreignKey: {
      name: 'tecler_id',
      type: DataTypes.INTEGER,
      allowNull: false
  },
  onDelete: 'CASCADE'
});

Usuarios.hasMany(Estudios, {
  foreignKey: {
      name: 'tecler_id',
      type: DataTypes.INTEGER,
      allowNull: false
  },
  onDelete: 'CASCADE'
});

Usuarios.hasMany(Feedback, {
  foreignKey: {
      name: 'tecler_id',
      type: DataTypes.INTEGER,
      allowNull: false
  },
  onDelete: 'CASCADE'
});

Usuarios.hasMany(Feedback, {
  foreignKey: {
      name: 'tecler_amigo_id',
      type: DataTypes.INTEGER,
      allowNull: false
  },
  onDelete: 'CASCADE'
});

Usuarios.hasMany(Entornos, {
  foreignKey: {
      name: 'tecler_id',
      type: DataTypes.INTEGER,
      allowNull: false
  },
  onDelete: 'CASCADE'
});

Usuarios.hasMany(Hobbies, {
  foreignKey: {
      name: 'tecler_id',
      type: DataTypes.INTEGER,
      allowNull: false
  },
  onDelete: 'CASCADE'
});

Usuarios.hasMany(Redes, {
  foreignKey: {
      name: 'tecler_id',
      type: DataTypes.INTEGER,
      allowNull: false
  },
  onDelete: 'CASCADE'
});

Usuarios.hasMany(Tecnologias, {
  foreignKey: {
      name: 'tecler_id',
      type: DataTypes.INTEGER,
      allowNull: false
  },
  onDelete: 'CASCADE'
});

Usuarios.hasMany(Amigos, {
  foreignKey: {
      name: 'tecler_id',
      type: DataTypes.INTEGER,
      allowNull: false
  },
  onDelete: 'CASCADE'
});

Usuarios.hasMany(Amigos, {
  foreignKey: {
      name: 'tecler_amigo_id',
      type: DataTypes.INTEGER,
      allowNull: false
  },
  onDelete: 'CASCADE'
});