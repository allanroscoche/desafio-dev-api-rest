const ContaService = require("./conta_service");
const { Contas, Transacao } = require("../models");
const service = new ContaService(Contas, Transacao);

const contaMock = {
  idPessoa: 1,
  tipoConta: "poupanca"
};
let contaId;

describe("Conta Service Integration test", () => {
  afterAll( () => {
    Contas.sequelize.close();
    Transacao.sequelize.close();
  });
  test("Deve criar uma conta", async () => {
    const conta = await service.criar(contaMock);
    contaId = conta.idConta;
    expect(conta).toStrictEqual({
      idConta: contaId,
      idPessoa: 1,
      tipoConta: "poupanca",
      saldo: 0,
      limiteSaqueDiario: 100,
      dataCriacao: conta.dataCriacao 
    });
  });
  test("Deve consultar saldo numa conta", async () => {
    const conta = await service.consultar({contaId});
    expect(conta).toStrictEqual({
      idConta: contaId,
      idPessoa: 1,
      tipoConta: "poupanca",
      saldo: "0.00",
      limiteSaqueDiario: "100.00",
      dataCriacao: conta.dataCriacao,
    });
  });
  test("Deve depositar numa conta", async () => {
    const result = await service.depositar({contaId, valor: 10});
    expect(result).toBeTruthy();
  });
  test("Nao deve consultar saldo numa conta inexistente", async () => {
    const conta = await service.consultar({contaId: 9999999999999});
    expect(conta).toBe(null);
  });
    test("Deve realizar saque  numa conta", async () => {
    await service.sacar({contaId, valor: 10});
  });
  test("Deve bloquear uma conta", async () => {
    await service.bloquear({contaId});
  });
  test("Deve bloquear uma conta", async () => {
    const extrato = await service.extrato({contaId});
    expect(extrato.extrato.length).toBe(2);
  });


});
