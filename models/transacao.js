'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Transacao.init({
    idTransacao: DataTypes.INTEGER,
    idConta: DataTypes.INTEGER,
    valor: DataTypes.DECIMAL,
    dataTransacao: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transacao',
  });
  return Transacao;
};