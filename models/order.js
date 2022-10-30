'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Order.init(
    {
      domain: DataTypes.STRING,
      orderId: DataTypes.BIGINT,
      orderStatusUrl: DataTypes.STRING,
      lineItems: DataTypes.JSON,
      fulfillmentStatus: DataTypes.STRING,
      fulfillmentId: DataTypes.BIGINT,
      fulfillmentDate: DataTypes.DATE,
      fulfillmentTrackingCompany: DataTypes.STRING,
      fulfillmentTrackingNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  return Order;
};
