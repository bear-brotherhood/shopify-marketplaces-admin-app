import {DataType} from '@shopify/shopify-api';
import {callShopifyRestAPI, HTTP_POST_METHOD} from '../client';

export const postResourceFeedback = async (shop, token, feedbackData) => {
  const resp = await callShopifyRestAPI(
    shop,
    token,
    HTTP_POST_METHOD,
    'resource_feedback',
    {
      resource_feedback: {
        ...feedbackData,
        feedback_generated_at: new Date().toISOString(),
      },
    },
    DataType.JSON,
  );

  return resp.body.shop;
};
