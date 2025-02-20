import {gql} from 'apollo-server-express';

export const typeDefs = `
type AdminShopSubscription {
  confirmationUrl: String
  accepted: Boolean!
}
type AdminShopConfig {
  hasStorefront: Boolean!
  shipsToUnitedKingdom: Boolean!
  gbpEnabled: Boolean!
  hasPolicies: Boolean!
}
type AdminShop {
  id: ID!
  domain: String!
  publicationId: String!
  appHandle: String!
  availableProductCount: Int!
  onboardingInfoCompleted: Boolean!
  termsAccepted: Boolean!
  onboardingCompleted: Boolean!
  meetsRequirements: Boolean!
  config: AdminShopConfig!
  subscription: AdminShopSubscription!
}
type Shop {
  id: ID!
  country: String!
  domain: String!
  name: String!
  storefrontAccessToken: String!
}
type Query {
  adminShop: AdminShop!
  shop(id: Int!): Shop
  shops(country: String, nameIsLike: String, reverse: Boolean, domains: [String]): [Shop]
  shopCountries: [String]
}
type Mutation {
  completeOnboardingInfo: AdminShop
  acceptTerms: AdminShop
  completeOnboarding: AdminShop
}
`;

export const schema = gql(typeDefs);
