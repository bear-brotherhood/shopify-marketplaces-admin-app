import Shopify from '@shopify/shopify-api';
import {createUsageRecord} from '..';
import db from '../../../models';

export const handleOrderCreate = async (shop, body) => {
  const data = JSON.parse(body);

  try {
    await db.Order.create({
      domain: shop,
      orderId: data.id,
      orderStatusUrl: data.order_status_url,
      lineItems: data.line_items,
    });
  } catch (err) {
    console.log('Error creating the entry in the database: ', err);
  }

  const {accessToken} = await Shopify.Utils.loadOfflineSession(shop);

  const {subscriptionLineItemId} = await db.Shop.findOne({
    where: {domain: shop},
  });

  await createUsageRecord(shop, accessToken, subscriptionLineItemId);
};

export const handleOrderFulfill = async (shop, body) => {
  const data = JSON.parse(body);

  const fulfillment = data.fulfillments[0];

  const order = await db.Order.findOne({
    where: {orderId: fulfillment.order_id},
  });

  if (!order) return;

  const orderUpdate = {
    fulfillmentStatus: data.fulfillment_status,
    fulfillmentId: fulfillment.id,
    fulfillmentDate: fulfillment.created_at,
    fulfillmentTrackingCompany: fulfillment.tracking_company,
    fulfillmentTrackingNumber: fulfillment.tracking_number,
  };

  await order.update(orderUpdate);

  await order.save();
};
