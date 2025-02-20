import Shopify from '@shopify/shopify-api';
import {getShopPolicyTypes, getShopShippingCountries} from '..';
import {handleResourceFeedback, isShopApproved} from '../../helpers';
import db from '../../../models';

export const handleShopUpdate = async (shop, body) => {
  const {name, has_storefront, enabled_presentment_currencies} =
    JSON.parse(body);
  const {accessToken} = await Shopify.Utils.loadOfflineSession(shop);
  const shipsToCountries = await getShopShippingCountries(shop, accessToken);
  const policyTypes = await getShopPolicyTypes(shop, accessToken);

  const meetsRequirements = isShopApproved(
    has_storefront,
    enabled_presentment_currencies,
    shipsToCountries,
    policyTypes,
  );

  await handleResourceFeedback(shop, accessToken, meetsRequirements);

  const shopData = {
    name,
    meetsRequirements,
  };

  try {
    await db.Shop.update(shopData, {where: {domain: shop}});
  } catch (err) {
    console.error('Failed to update shop in db', err);
  }
};
