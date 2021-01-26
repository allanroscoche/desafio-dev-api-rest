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


module.exports = class ContaService {
  constructor(conta) {
    this.conta = conta;
  }
  async criar({idPessoa, tipoConta}) {
    await this.conta.create({
      idPessoa,
      tipoConta,
      saldo:0,
      limiteSaqueDiario: 100,
      flagAtivo: true
    });
  }
  async depositar({contaId, valor}) {
    const conta = await this.conta.findByPk(contaId);
    if(conta) {
      conta.saldo = add(conta.saldo, valor) 
      await conta.save();
      return true;
    }
    return false;
  }
  consultar({contaId}) {
    return this.conta.findByPk(contaId);
  }
  async sacar({contaId, valor}) {
    const conta = await this.conta.findByPk(contaId);
    if(conta) {
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
