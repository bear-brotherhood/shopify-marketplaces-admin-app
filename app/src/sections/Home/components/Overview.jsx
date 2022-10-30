import React from 'react';
import {
  FeatureListCard,
  OverviewPage,
  ProductStatusSection,
} from '@shopify/channels-ui';
import {useAppBridge} from '@shopify/app-bridge-react';
import {AppLink, ChannelMenu} from '@shopify/app-bridge/actions';
import {Banner} from '@shopify/polaris';

const Overview = ({
  domain,
  availableProductCount,
  publicationId,
  appHandle,
  meetsRequirements,
}) => {
  const app = useAppBridge();
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
    active: overviewLink,
  });

  return (
    <OverviewPage title="Bear Brotherhood channel overview">
      {!meetsRequirements && (
        <OverviewPage.Section>
          <Banner
            status="critical"
            title="Your shop no longer meets Bear Brotherhood requirements"
            action={{
              content: 'View details',
              url: '/settings',
            }}
          >
            <p>
              Your shop has been removed from the Bear Brotherhood Marketplace
              because it no longer meets the requirements. To continue selling,
              please ensure your store meets all requirements.
            </p>
          </Banner>
        </OverviewPage.Section>
      )}
      <OverviewPage.Section title="Product status on Bear Brotherhood">
        <ProductStatusSection
          manageAction={{
            content: 'Manage availability',
            external: true,
            url: `https://${domain}/admin/bulk?resource_name=Product&edit=publications.${publicationId}.published_at`,
          }}
          summary={`${availableProductCount} products available to Bear Brotherhood`}
          productStatuses={[
            {
              badge: {
                children: 'Published',
                status: 'success',
              },
              label: {
                content: `${availableProductCount} products`,
                external: true,
                url: `https://${domain}/admin/products?selectedView=all&published_status=${appHandle}%3Avisible`,
              },
            },
          ]}
        />
      </OverviewPage.Section>
      <OverviewPage.Section title="Manage your Bear Brotherhood features">
        <FeatureListCard
          features={[
            {
              title: 'Bear Brotherhood Marketplace',
              description:
                'Customers can discover your brand and purchase products directly on the Bear Brotherhood Marketplace.',
              badge: {children: 'Active', status: 'success'},
            },
          ]}
        />
      </OverviewPage.Section>
    </OverviewPage>
  );
};

export default Overview;
