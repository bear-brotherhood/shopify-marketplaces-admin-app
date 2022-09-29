import {callShopifyGraphqlAPI} from '../client';

const SHOP_SHIPPING_COUNTRIES = `
query {
    shop {
      shipsToCountries
    }
  }
`;

export const getShopShippingCountries = async (shop, token) => {
  const resp = await callShopifyGraphqlAPI(shop, token, {
    query: SHOP_SHIPPING_COUNTRIES,
  });
  return resp.body.data.shop.shipsToCountries;
};
