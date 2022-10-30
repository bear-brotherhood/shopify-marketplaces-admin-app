import {callShopifyGraphqlAPI} from '../client';

const SHOP_POLICY_TYPES = `
  query {
    shop {
      shopPolicies {
        type
        body
      }
    }
  }
`;

export const getShopPolicyTypes = async (shop, token) => {
  const resp = await callShopifyGraphqlAPI(shop, token, {
    query: SHOP_POLICY_TYPES,
  });

  return resp.body.data.shop.shopPolicies.reduce((arr, {type, body}) => {
    if (body.length > 0) {
      arr.push(type);
    }
    return arr;
  }, []);
};
