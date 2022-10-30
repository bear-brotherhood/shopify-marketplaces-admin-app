import {callShopifyRestAPI, HTTP_GET_METHOD} from '../client';

export const getAppSubscription = async (shop, token, id) => {
  const resp = await callShopifyRestAPI(
    shop,
    token,
    HTTP_GET_METHOD,
    `recurring_application_charges/${id}`,
  );

  return resp.body.recurring_application_charge;
};
