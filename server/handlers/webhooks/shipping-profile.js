import Shopify from '@shopify/shopify-api';
import {
  getShopConfiguration,
  getShopPolicyTypes,
  getShopShippingCountries,
} from '..';
import db from '../../../models';
import {handleResourceFeedback, isShopApproved} from '../../helpers';

export const handleShippingProfileUpdate = async (shop) => {
  const {accessToken} = await Shopify.Utils.loadOfflineSession(shop);

  const {has_storefront, enabled_presentment_currencies} =
    await getShopConfiguration(shop, accessToken);
  const shipsToCountries = await getShopShippingCountries(shop, accessToken);
  const policyTypes = await getShopPolicyTypes(shop, accessToken);

  const meetsRequirements = isShopApproved(
    has_storefront,
    enabled_presentment_currencies,
    shipsToCountries,
    policyTypes,
  );

  await handleResourceFeedback(shop, accessToken, meetsRequirements);

  try {
    await db.Shop.update({meetsRequirements}, {where: {domain: shop}});
  } catch (err) {
    console.error('Failed to update shop in db', err);
  }
};
