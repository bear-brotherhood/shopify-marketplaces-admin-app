'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Shops', 'subscriptionId', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Shops', 'subscriptionLineItemId', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Shops', 'subscriptionId');
    await queryInterface.removeColumn('Shops', 'subscriptionLineItemId');
  },
};
