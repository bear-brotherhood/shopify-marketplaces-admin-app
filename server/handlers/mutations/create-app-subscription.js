import {callShopifyGraphqlAPI} from '../client';
import dotenv from 'dotenv';
dotenv.config();

const APP_SUBSCRIPTION_CREATE = `
  mutation AppSubscriptionCreate(
    $name: String!
    $returnUrl: URL!
    $lineItems: [AppSubscriptionLineItemInput!]!
  ) {
    appSubscriptionCreate(
      name: $name
      test: true
      returnUrl: $returnUrl
      lineItems: $lineItems
    ) {
      userErrors {
        message
      }
      confirmationUrl
      appSubscription {
        id
        lineItems {
          id
        }
      }
    }
  }
`;

export const createAppSubscription = async (shop, token, appHandle) => {
  const variables = {
    name: 'Bear Brotherhood Marketplace Fee',
    returnUrl: `https://${shop}/admin/apps/${appHandle}`,
    lineItems: [
      {
        plan: {
          appUsagePricingDetails: {
            cappedAmount: {
              amount: 20,
              currencyCode: 'GBP',
            },
            terms: '£0.50 per order',
          },
        },
      },
    ],
  };

  const resp = await callShopifyGraphqlAPI(shop, token, {
    query: APP_SUBSCRIPTION_CREATE,
    variables,
  });
  return {
    subscriptionId: resp.body.data.appSubscriptionCreate.appSubscription.id,
    subscriptionConfirmationUrl:
      resp.body.data.appSubscriptionCreate.confirmationUrl,
    subscriptionLineItemId:
      resp.body.data.appSubscriptionCreate.appSubscription.lineItems[0].id,
  };
};
