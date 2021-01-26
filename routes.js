const express = require('express');
const router = express.Router();
const ContaService = require("./services/conta_service");
const { Contas } = require("./models");
const service = new ContaService(Contas);

router.get('/conta/:id', async (req, res) => {
  const id = req.params.id;
  const conta = await service.consultar({contaId: id});
  res.json(conta);
});
router.put('/conta/:id', async (req, res) => {
  const id = req.params.id;
  const conta = await service.bloquear({contaId: id});
  const msg = conta ? "Conta bloqueada" : "Nao encontrado";
  res.json({msg});
});
router.post('/conta/:id/deposito', async (req, res) => {
  const id = req.params.id;
  const conta = await service.deposito({contaId: id});
  const msg = conta ? "Conta bloqueada" : "Nao encontrado";
  res.send('deposito');
});
router.post('/conta/:id/saque', async (req, res) => {
  const id = req.params.id;
  const msg = conta ? "Conta bloqueada" : "Nao encontrado";
  res.send('saque');
});
router.get('/conta/:id/extrato', async (req, res) => {
  const id = req.params.id;
  res.send('extrato');
});
router.post('/conta/', async (req, res) => {
  res.send('hello');
});

module.exports = router;
