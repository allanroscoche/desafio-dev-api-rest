'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Pessoas', [
      {
        nome: "Nome Pessoa 1",
        cpf: "12312312345",
        dataNascimento: new Date("1990-10-10"),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      },
      {
        nome: "Nome Pessoa 2",
        cpf: "32132132154",
        dataNascimento: new Date("1995-10-10"),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Pessoas', null, {});
  }
};
