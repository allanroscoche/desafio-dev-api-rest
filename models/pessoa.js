'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pessoa.init({
    idPessoa: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    dataNascimento: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Pessoa',
    timestamps: false
  });
  return Pessoa;
};
