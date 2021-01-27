const express = require('express');
const router = express.Router();
const ContaService = require("./services/conta_service");
const { Contas, Transacao } = require("./models");
const service = new ContaService(Contas, Transacao);

/**
 * @swagger
 *
 * /contas/{contaId}:
 *   get:
 *     summary: Consulta uma conta
 *     description: Consulta uma conta
 *     responses:
 *       200:
 *         description: Conta encontrada
 *       404:
 *         description: Conta nao encontrada
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: contaId
 *         in: path
 *         required: true
 *         type: integer
 */
router.get('/contas/:id', async (req, res) => {
  const id = req.params.id;
  const conta = await service.consultar({contaId: id});
  res.json(conta);
});

/**
 * @swagger
 *
 * /contas/{contaId}:
 *   delete:
 *     summary: Bloqueia uma conta
 *     description: Bloqueia uma conta
 *     responses:
 *       200:
 *         description: Conta encontrada
 *       404:
 *         description: Conta nao encontrada
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: contaId
 *         in: path
 *         required: true
 *         type: integer
 */
router.delete('/contas/:id', async (req, res) => {
  const id = req.params.id;
  const conta = await service.bloquear({contaId: id});
  const msg = conta ? "Conta bloqueada" : "Nao encontrado";
  res.json({msg});
});
/**
 * @swagger
 *
 * /contas/{contaId}/deposito:
 *   post:
 *     summary: Bloqueia uma conta
 *     description: Cria um deposito na conta
 *     responses:
 *       200:
 *         description: Conta encontrada
 *       404:
 *         description: Conta nao encontrada
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: contaId
 *         in: path
 *         required: true
 *         type: integer
 */
router.post('/contas/:id/deposito', async (req, res) => {
  const id = req.params.id;
  const conta = await service.deposito({contaId: id});
  const msg = conta ? "Conta bloqueada" : "Nao encontrado";
  res.json({msg});
});

/**
 * @swagger
 *
 * /contas/{contaId}/saque:
 *   post:
 *     summary: Cria um saque na conta
 *     description: Cria um saque na conta
 *     responses:
 *       200:
 *         description: Conta encontrada
 *       404:
 *         description: Conta nao encontrada
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: pessoaId
 *         in: path
 *         required: true
 *         type: integer
 */
router.post('/contas/:id/saque', async (req, res) => {
  const id = req.params.id;
  const conta = await service.saque({contaId: id});
  const msg = conta ? "Conta bloqueada" : "Nao encontrado";
  res.json({msg});
});
/**
 * @swagger
 *
 * /contas/{contaId}/extrato:
 *   get:
 *     summary: Obtem o extrato uma conta
 *     description: Cria um deposito na conta
 *     responses:
 *       200:
 *         description: Conta encontrada
 *       404:
 *         description: Conta nao encontrada
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: contaId
 *         in: path
 *         required: true
 *         type: integer
 */
router.get('/contas/:id/extrato', async (req, res) => {
  const id = req.params.id;
  const extrato = await service.extrato({contaId: id});
  res.json(extrato);
});
/**
 * @swagger
 *
 * /contas:
 *   post:
 *     summary: Cria uma conta
 *     description: Cria uma conta
 *     responses:
 *       200:
 *         description: Conta criada
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: conta
 *         in: body
 *         required: true
 *         type: object
 *         properties:
 *          idPessoa: 
 *            type: string
 *          tipoConta:
 *            type: string
 *
 */
router.post('/contas/', async (req, res) => {
  const conta = await service.criar(req.body);
  res.json(conta);
});

module.exports = router;
