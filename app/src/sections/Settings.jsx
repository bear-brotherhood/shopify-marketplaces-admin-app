import React, {useEffect} from 'react';
import {SettingsPage, Checklist} from '@shopify/channels-ui';
import {Card, Link, SkeletonBodyText} from '@shopify/polaris';
import {useAppBridge} from '@shopify/app-bridge-react';
import {AppLink, ChannelMenu, Redirect} from '@shopify/app-bridge/actions';
import {gql, useQuery} from '@apollo/client';
import {useNavigate} from 'react-router-dom';

const SETTINGS_PAGE_QUERY = gql`
  query OnboardingPageQuery {
    adminShop {
      id
      onboardingCompleted,
      config {
        hasStorefront
        shipsToUnitedKingdom
        gbpEnabled
        hasPolicies
      }
      subscription {
        confirmationUrl
        accepted
      }
    }
  }
`;

const SettingsChecklist = ({
  hasStorefront,
  shipsToUnitedKingdom,
  gbpEnabled,
  hasPolicies,
  subscriptionAccepted,
  subscriptionConfirmationUrl,
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
      label: 'Add a shipping rates for UnitedKingdom',
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
    <Checklist
      completeLabel="Your shop meets Bear Brotherhood's requirements"
      items={items}
    />
  );
};

const Settings = () => {
  const {data} = useQuery(SETTINGS_PAGE_QUERY);
  const app = useAppBridge();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && !data.adminShop.onboardingCompleted) {
      navigate('/');
    }
  }, [data]);

  const overviewLink = AppLink.create(app, {
    label: 'Overview',
    destination: '/',
  });
  const settingsLink = AppLink.create(app, {
    label: 'Settings',
    destination: '/settings',
  });
  ChannelMenu.create(app, {
    items: [overviewLink, settingsLink],
    active: settingsLink,
  });

  const checklistCardProps = data
    ? {
        children: (
          <SettingsChecklist
            {...data.adminShop.config}
            subscriptionAccepted={data.adminShop.subscription.accepted}
            subscriptionConfirmationUrl={
              data.adminShop.subscription.confirmationUrl
            }
          />
        ),
      }
    : {
        sectioned: true,
        children: <SkeletonBodyText lines={4} />,
      };

  return (
    <SettingsPage title="Settings">
      <SettingsPage.Section
        title="Store requirements"
        description="This checklist ensures that your store meets Bear Brotherhood requirements."
      >
        <Card {...checklistCardProps} />
      </SettingsPage.Section>
      <SettingsPage.Section
        title="Terms and conditions"
        description="You can view the Bear Brotherhood Marketplace terms and conditions here at any time."
      >
        <Card sectioned>
          <p>
            You have agreed to the{' '}
            <Link url="https://www.shopify.com/legal/terms" external>
              Bear Brotherhood Marketplace Terms of Service
            </Link>
            .
          </p>
        </Card>
      </SettingsPage.Section>
    </SettingsPage>
  );
};

export default Settings;
