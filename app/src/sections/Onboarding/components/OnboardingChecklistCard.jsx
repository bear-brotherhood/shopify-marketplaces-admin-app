import React from 'react';
import {OnboardingCard, OnboardingChecklist} from '@shopify/channels-ui';
import {useAppBridge} from '@shopify/app-bridge-react';
import {Redirect} from '@shopify/app-bridge/actions';

const OnboardingChecklistCard = ({
  hasStorefront,
  shipsToUnitedKingdom,
  gbpEnabled,
  hasPolicies,
  state,
  subscriptionConfirmationUrl,
  subscriptionAccepted,
}) => {
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  const handleOnlineStoreAction = () => {
    redirect.dispatch(Redirect.Action.ADMIN_PATH, {
      path: '/settings/channels',
    });
  };

  const handleShippingAction = () => {
    redirect.dispatch(Redirect.Action.ADMIN_PATH, {
      path: '/settings/shipping',
    });
  };

  const handleCurrencyAction = () => {
    redirect.dispatch(Redirect.Action.ADMIN_PATH, {
      path: '/settings/payments',
    });
  };

  const handlePolicyAction = () => {
    redirect.dispatch(Redirect.Action.ADMIN_PATH, {
      path: '/settings/legal',
    });
  };

  const handleSubscriptionAction = () => {
    redirect.dispatch(Redirect.Action.REMOTE, {
      url: subscriptionConfirmationUrl,
    });
  };

  const items = [
    {
      label: 'Create an online store',
      completed: hasStorefront,
      action: {
        onAction: handleOnlineStoreAction,
      },
    },
    {
      label: 'Add a shipping rates for the United Kingdom',
      completed: shipsToUnitedKingdom,
      action: {
        onAction: handleShippingAction,
      },
    },
    {
      label: 'Add support for GBP to you payment processor',
      completed: gbpEnabled,
      action: {
        onAction: handleCurrencyAction,
      },
    },
    {
      label: 'Add a privacy policy and return policy',
      completed: hasPolicies,
      action: {
        onAction: handlePolicyAction,
      },
    },
    {
      label: 'Accept the app subscription agreement',
      completed: subscriptionAccepted,
      action: {
        onAction: handleSubscriptionAction,
      },
    },
  ];

  return (
    <OnboardingCard
      title="Make sure your store meets Bear Brotherhood’s requirements"
      state={state}
      footer={
        <p>
          Any changes made to these items after setup might result in your store
          being temporarily removed from the Bear Brotherhood Marketplace.
        </p>
      }
    >
      <OnboardingChecklist items={items} />
    </OnboardingCard>
  );
};

export default OnboardingChecklistCard;
