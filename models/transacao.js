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
      Transacao.belongsTo(models.Contas, {
        foreignKey: 'idConta'
      });

    }
  };
  Transacao.init({
    idTransacao: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    valor: DataTypes.DECIMAL,
    dataTransacao: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.createdAt;
        }
      }
    }, {
    sequelize,
    modelName: 'Transacao',
    tableName: 'Transacoes'
  });
  return Transacao;
};
