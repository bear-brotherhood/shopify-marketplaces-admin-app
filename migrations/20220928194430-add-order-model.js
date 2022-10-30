'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      domain: {
        type: Sequelize.STRING,
      },
      orderId: {
        unique: true,
        type: Sequelize.BIGINT,
      },
      orderStatusUrl: {
        type: Sequelize.STRING,
      },
      lineItems: {
        type: Sequelize.JSON,
      },
      fulfillmentStatus: {
        type: Sequelize.STRING,
      },
      fulfillmentId: {
        type: Sequelize.BIGINT,
      },
      fulfillmentDate: {
        type: Sequelize.DATE,
      },
      fulfillmentTrackingCompany: {
        type: Sequelize.STRING,
      },
      fulfillmentTrackingNumber: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Orders');
  },
};
