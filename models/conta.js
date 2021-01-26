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
      Conta.belongsTo(models.Pessoa, {
        foreignKey: 'idPessoa'
      });
    }
  }
  Conta.init({
    idConta: { 
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    saldo: DataTypes.DECIMAL,
    limiteSaqueDiario: DataTypes.DECIMAL,
    flagAtivo: DataTypes.BOOLEAN,
    tipoConta: DataTypes.INTEGER,
    dataCriacao: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.createdAt;
      }
    }
  }, {
    sequelize,
    modelName: 'Contas',
  });
  return Conta;
};
