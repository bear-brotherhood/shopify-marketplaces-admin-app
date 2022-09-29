import React from 'react';
import {OnboardingCard, OnboardingInfo} from '@shopify/channels-ui';
import {QuickSaleMajor} from '@shopify/polaris-icons';
import {gql, useMutation} from '@apollo/client';
import {BillingStatementPoundMajor} from '@shopify/polaris-icons';

const COMPLETE_ONBOARDING_INFO_MUTATION = gql`
  mutation CompleteOnboardingInfo {
    completeOnboardingInfo {
      id
      onboardingInfoCompleted
    }
  }
`;

const OnboardingInfoCard = ({state}) => {
  const [completeOnboardingInfo, {loading}] = useMutation(
    COMPLETE_ONBOARDING_INFO_MUTATION,
  );

  const handleAction = () => {
    completeOnboardingInfo();
  };

  return (
    <OnboardingCard
      title="What you need to know before you start"
      state={state}
    >
      <OnboardingInfo
        completed={state === 'completed'}
        items={[
          {
            icon: {
              color: 'subdued',
              source: QuickSaleMajor,
            },
            title:
              'Buyers will be directed to checkout directly from the marketplace',
            content: (
              <p>
                Buyers will be able to purchase your products directly from the
                Bear Brotherhood Marketplace. They will be redirected to your
                online store checkout to complete their purchase.
              </p>
            ),
          },
          {
            icon: {
              color: 'subdued',
              source: BillingStatementPoundMajor,
            },
            title: 'Every order made through Bear Brotherhood will have a £0.50 fee',
            content: (
              <p>
                The fee will be charged each time a buyer completes a checkout
                initiated in the marketplace, and will not be credited for
                refunded orders. You will be charged every month, up to a
                maximum of £20.00.
              </p>
            ),
          },
        ]}
        action={{
          content: 'I understand',
          loading,
          onAction: handleAction,
        }}
      />
    </OnboardingCard>
  );
};

export default OnboardingInfoCard;
