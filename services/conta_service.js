const { BigDecimal } = require("bigdecimal");

function format({
  idConta, saldo, idPessoa, limiteSaqueDiario, 
  flagAtivo, dataCriacao, tipoConta
  }) {
  if(!flagAtivo) {
    return { msg: "Conta bloqueada" }
  }
  return {
    idConta,
    idPessoa,
    saldo,
    limiteSaqueDiario,
    tipoConta,
    dataCriacao: (new Date(dataCriacao)).toLocaleString()
  }
}
module.exports = class ContaService {
  constructor(conta, transacoes) {
    this.conta = conta;
    this.transacoes = transacoes;
  }
  async criar({idPessoa, tipoConta}) {
    const conta = await this.conta.create({
      idPessoa,
      tipoConta,
      saldo:0,
      limiteSaqueDiario: 100,
      flagAtivo: true
    });
    return format(conta);
  }
  async consultar({contaId}) {
    const conta =  await this.conta.findByPk(contaId);
    if(conta)
      return format(conta);
    else
      return null;
  }
  async depositar({contaId, valor}) {
    const conta = await this.conta.findByPk(contaId);
    if(conta && conta.flagAtivo) {
      const valor_decimal = BigDecimal(valor).abs();
      conta.saldo = BigDecimal(conta.saldo).add(valor_decimal); 
      const tran = await this.transacoes.create({
        idConta: contaId,
        valor: valor_decimal,
      });
      await conta.save();
      return {idTransacao: tran.idTransacao};
    }
    return false;
  }
  async sacar({contaId, valor}) {
    const conta = await this.conta.findByPk(contaId);
    if(conta && conta.flagAtivo) {
      const valor_decimal = BigDecimal(valor).abs();
      conta.saldo = BigDecimal(conta.saldo).subtract(valor_decimal); 
      const tran = await this.transacoes.create({
        idConta: contaId,
        valor: -valor_decimal,
      });
      await conta.save();
      return {idTransacao: tran.idTransacao};
    }
    return false;
  }
  async bloquear({contaId}) {
    const conta = await this.conta.findByPk(contaId);
    if(conta) {
      conta.flagAtivo = false; 
      await conta.save();
      return true;
    }
    return false;
  }
  async extrato({contaId}) {
    const transactions = await this.transacoes.findAll({
      where: {
        idConta: contaId
      }
    });
    const extrato =  transactions.map( ({idTransacao, valor}) => {
      return {
        idTransacao,
        valor: BigDecimal(valor).toString()
      };
    });
    return {
      contaId,
      extrato
    };
  }
}
