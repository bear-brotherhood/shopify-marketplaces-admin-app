import {Shopify} from '@shopify/shopify-api';
import {handleAppUninstall} from './app-uninstall';
import {handleOrderCreate, handleOrderFulfill} from './orders';
import {handleShopUpdate} from './shop-update';
import {handleShippingProfileUpdate} from './shipping-profile';

const APP_UNINSTALLED = 'APP_UNINSTALLED';
const SHOP_UPDATE = 'SHOP_UPDATE';
const PROFILES_CREATE = 'PROFILES_CREATE';
const PROFILES_UPDATE = 'PROFILES_UPDATE';
const PROFILES_DELETE = 'PROFILES_DELETE';
const ORDERS_CREATE = 'ORDERS_CREATE';
const ORDERS_FULFILLED = 'ORDERS_FULFILLED';

export const addWebhookHandlers = () => {
  Shopify.Webhooks.Registry.addHandler(APP_UNINSTALLED, {
    path: '/webhooks',
    webhookHandler: async (topic, shop) => await handleAppUninstall(shop),
  });

  Shopify.Webhooks.Registry.addHandler(SHOP_UPDATE, {
    path: '/webhooks',
    webhookHandler: async (topic, shop, body) =>
      await handleShopUpdate(shop, body),
  });

  Shopify.Webhooks.Registry.addHandler(PROFILES_CREATE, {
    path: '/webhooks',
    webhookHandler: async (_topic, shop) =>
      await handleShippingProfileUpdate(shop),
  });

  Shopify.Webhooks.Registry.addHandler(PROFILES_UPDATE, {
    path: '/webhooks',
    webhookHandler: async (_topic, shop) =>
      await handleShippingProfileUpdate(shop),
  });

  Shopify.Webhooks.Registry.addHandler(PROFILES_DELETE, {
    path: '/webhooks',
    webhookHandler: async (_topic, shop) =>
      await handleShippingProfileUpdate(shop),
  });

  Shopify.Webhooks.Registry.addHandler(ORDERS_CREATE, {
    path: '/webhooks',
    webhookHandler: async (topic, shop, body) =>
      await handleOrderCreate(shop, body),
  });

  Shopify.Webhooks.Registry.addHandler(ORDERS_FULFILLED, {
    path: '/webhooks',
    webhookHandler: async (topic, shop, body) =>
      await handleOrderFulfill(shop, body),
  });
};

export const registerWebhooks = async (shop, accessToken) => {
  const registerAllResponse = await Shopify.Webhooks.Registry.registerAll({
    shop,
    accessToken,
  });

  Object.keys(registerAllResponse).forEach((key) => {
    if (!registerAllResponse[key].success) {
      console.log(
        `Failed to register ${key} webhook: ${registerAllResponse[key].result}`,
      );
    }
  });
};
