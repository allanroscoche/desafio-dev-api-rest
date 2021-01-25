'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Conta.hasMany(models.Transacao);
    }
  }
  Conta.init({
    idConta: DataTypes.INTEGER,
    idPessoa: DataTypes.INTEGER,
    saldo: DataTypes.DECIMAL,
    limiteSaqueDiario: DataTypes.DECIMAL,
    flagAtivo: DataTypes.BOOLEAN,
    tipoConta: DataTypes.INTEGER,
    dataCriacao: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Conta',
  });
  return Conta;
};
