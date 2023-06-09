const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'recipe',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,

        // type: DataTypes.INTEGER,
        // allowNull: false,
        // primaryKey: true,
        // autoIncrement: true,

      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      healthScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 100,
        },
      },
      steps: {
        type: DataTypes.STRING,
        // allowNull: false
        // type: DataTypes.ARRAY(DataTypes.TEXT),
      },
       create: {
        type: DataTypes.BOOLEAN,// funciona a modo de flat para saber q lo cree yo
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false
    }
  );
};
