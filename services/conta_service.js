const { BigDecimal } = require("bigdecimal");

function add(base, valor) {
      const saldo_decimal = BigDecimal(base);
      const valor_decimal = BigDecimal(valor);
      return saldo_decimal.add(valor_decimal.abs());
}
function sub(base, valor) {
      const saldo_decimal = BigDecimal(base);
      const valor_decimal = BigDecimal(valor);
      return saldo_decimal.sub(valor_decimal.abs());
}
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
  constructor(conta) {
    this.conta = conta;
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
      conta.saldo = add(conta.saldo, valor) 
      await conta.save();
      return true;
    }
    return false;
  }
  async sacar({contaId, valor}) {
    const conta = await this.conta.findByPk(contaId);
    if(conta && conta.flagAtivo) {
      conta.saldo = sub(conta.saldo, valor);
      await conta.save();
      return true;
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
}
