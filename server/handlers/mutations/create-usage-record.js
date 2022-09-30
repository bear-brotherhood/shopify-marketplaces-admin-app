import {callShopifyGraphqlAPI} from '../client';

const USAGE_RECORD_CREATE = `
  mutation appUsageRecordCreate(
    $subscriptionLineItemId: ID!
    $price: MoneyInput!
    $description: String!
  ) {
    appUsageRecordCreate(
      subscriptionLineItemId: $subscriptionLineItemId
      price: $price
      description: $description
    ) {
      appUsageRecord {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const createUsageRecord = async (
  shop,
  token,
  subscriptionLineItemId,
) => {
  const variables = {
    subscriptionLineItemId,
    price: {
      amount: 1.0,
      currencyCode: 'USD',
    },
    description: 'Marketplace order fee',
  };

  const resp = await callShopifyGraphqlAPI(shop, token, {
    query: USAGE_RECORD_CREATE,
    variables,
  });

  return resp.body.data.appUsageRecordCreate;
};
