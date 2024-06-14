import { render, screen } from '@/tests/test-utils';
import userEvent from '@testing-library/user-event';

import { Tabs, TabsList, Tab, TabsPanels, TabPanel } from '../Tabs';

const TestTabs = () => {
  return (
    <Tabs>
      <TabsList>
        <Tab>one</Tab>
        <Tab>two</Tab>
        <Tab>three</Tab>
      </TabsList>

      <TabsPanels>
        <TabPanel>panel one</TabPanel>
        <TabPanel>panel one</TabPanel>
        <TabPanel>panel two</TabPanel>
      </TabsPanels>
    </Tabs>
  );
};

describe('TestTabs', () => {
  const createTabButtonAndTabPanelPairs = (
    tabButtons: HTMLElement[],
    tabPanels: HTMLElement[],
  ) =>
    tabButtons.map((_, index) => [
      tabButtons[index],
      tabPanels[index],
    ]);

  test('should initially set the first tab as active', () => {
    render(<TestTabs />);

    const tabButtons = screen.queryAllByRole('tab');
    const tabPanels = screen.queryAllByRole('tabpanel', {
      hidden: true,
    });
    const tabs = createTabButtonAndTabPanelPairs(
      tabButtons,
      tabPanels,
    );

    tabs.forEach((tab, index) => {
      const [tabButton, tabPanel] = tab;

      if (index === 0) {
        expect(tabButton).toHaveAttribute('aria-selected', 'true');
        expect(tabPanel).toBeVisible();
      } else {
        expect(tabButton).toHaveAttribute('aria-selected', 'false');
        expect(tabPanel).not.toBeVisible();
      }
    });
  });

  test('should set the selected tab as active on click', async () => {
    const user = userEvent.setup();

    render(<TestTabs />);

    const tabButtons = screen.queryAllByRole('tab');
    const tabPanels = screen.queryAllByRole('tabpanel', {
      hidden: true,
    });
    const tabs = createTabButtonAndTabPanelPairs(
      tabButtons,
      tabPanels,
    );

    await user.click(tabButtons[1]);

    tabs.forEach((tab, index) => {
      const [tabButton, tabPanel] = tab;

      if (index === 1) {
        expect(tabButton).toHaveAttribute('aria-selected', 'true');
        expect(tabPanel).toBeVisible();
      } else {
        expect(tabButton).toHaveAttribute('aria-selected', 'false');
        expect(tabPanel).not.toBeVisible();
      }
    });

    await user.click(tabButtons[2]);

    tabs.forEach((tab, index) => {
      const [tabButton, tabPanel] = tab;

      if (index === 2) {
        expect(tabButton).toHaveAttribute('aria-selected', 'true');
        expect(tabPanel).toBeVisible();
      } else {
        expect(tabButton).toHaveAttribute('aria-selected', 'false');
        expect(tabPanel).not.toBeVisible();
      }
    });
  });
});
