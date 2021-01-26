const ContaService = require("./conta_service");
const { Contas } = require("../models");
const service = new ContaService(Contas);

const contaMock = {
  idPessoa: 1,
  tipoConta: "poupanca"
};

describe("Conta Service", () => {
  test("Deve criar uma conta", async () => {
    const conta = await service.criar(contaMock);
    expect(conta).toStrictEqual({
      idConta: 1,
      idPessoa: 1,
      tipoConta: "poupanca",
      saldo: 0,
      limiteSaqueDiario: 100,
      flagAtivo: true,
      dataCriacao: "agora"
    });
  });
  test("Deve depositar numa conta", async () => {
    await service.depositar({contaId: 1, valor: 10});
  });
  test("Nao deve consultar saldo numa conta inexistente", async () => {
    const conta = await service.consultar({contaId: 9999999999999});
    expect(conta).toBe(null);
  });
  test("Deve consultar saldo numa conta", async () => {
    const conta = await service.consultar({contaId: 1});
    expect(conta.toJSON()).toStrictEqual({
      idConta: 1,
      idPessoa: 1,
      tipoConta: "poupanca",
      saldo: "0.00",
      limiteSaqueDiario: "100.00",
      flagAtivo: true,
      dataCriacao: conta.createdAt,
      createdAt: conta.createdAt,
      updatedAt: conta.updatedAt
    });
  });
  test("Deve realizar saque  numa conta", async () => {
    await service.sacar({contaId: 1, valor: 10});
  });
  test("Deve bloquear uma conta", async () => {
    await service.bloquear({contaId: 1});
  });

});
