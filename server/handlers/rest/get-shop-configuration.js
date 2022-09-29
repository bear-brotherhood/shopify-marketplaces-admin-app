import {callShopifyRestAPI, HTTP_GET_METHOD} from '../client';

export const getShopConfiguration = async (shop, token) => {
  const resp = await callShopifyRestAPI(shop, token, HTTP_GET_METHOD, 'shop');

  return resp.body.shop;
};
