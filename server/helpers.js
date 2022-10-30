import {
  createStorefrontAccessToken,
  getStorefrontAccessToken,
  postResourceFeedback,
  createAppSubscription,
  getAppHandle,
} from './handlers';
import db from '../models';

export async function getOrCreateStorefrontAccessToken(shop, accessToken) {
  const storefrontAccessToken = await getStorefrontAccessToken(
    shop,
    accessToken,
  );

  return (
    storefrontAccessToken ||
    (await createStorefrontAccessToken(shop, accessToken))
  );
}
export function isShopCurrencyApproved(enabledPresentmentCurrencies) {
  return enabledPresentmentCurrencies.includes('GBP');
}
export function isShopShippingApproved(shipsToCountries) {
  return shipsToCountries.includes('GB');
}
export function isShopPolicyApproved(policyTypes) {
  return (
    policyTypes.includes('REFUND_POLICY') &&
    policyTypes.includes('PRIVACY_POLICY')
  );
}
export function isShopApproved(
  hasStorefront,
  enabledPresentmentCurrencies,
  shipsToCountries,
  policyTypes,
) {
  return (
    hasStorefront &&
    isShopCurrencyApproved(enabledPresentmentCurrencies) &&
    isShopShippingApproved(shipsToCountries) &&
    isShopPolicyApproved(policyTypes)
  );
}
export async function handleResourceFeedback(
  shop,
  accessToken,
  meetsRequirements,
) {
  const feedbackData = meetsRequirements
    ? {state: 'success'}
    : {
        state: 'requires_action',
        messages: [
          "has noticed that your store doesn't meet its requirements.",
        ],
      };

  await postResourceFeedback(shop, accessToken, feedbackData);
}
export async function getNewSubscriptionConfirmationUrl(shop, accessToken) {
  const appHandle = await getAppHandle(shop, accessToken);
  const {subscriptionId, subscriptionConfirmationUrl, subscriptionLineItemId} =
    await createAppSubscription(shop, accessToken, appHandle);

  await db.Shop.update(
    {subscriptionId, subscriptionLineItemId},
    {where: {domain: shop}},
  );

  return subscriptionConfirmationUrl;
}
