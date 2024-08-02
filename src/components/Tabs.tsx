import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  Children,
} from 'react';
import { cn } from '../utils/cn';
import { Button } from './Button';

type TabsContextValue = {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
};

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const tabsContext = useContext(TabsContext);

  if (!tabsContext) {
    throw new Error(
      'context has to be used within <TabsContext.Provider>',
    );
  }

  return tabsContext;
};

export const Tabs = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const contextValue = useMemo(
    () => ({
      activeTab,
      setActiveTab,
    }),
    [activeTab, setActiveTab],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      {children}
    </TabsContext.Provider>
  );
};

export const TabsList = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { activeTab, setActiveTab } = useTabsContext();

  return (
    <div className="flex" role="tablist">
      {Children.map(children, (child, index) => {
        return React.cloneElement(
          child as React.ReactElement<TabProps>,
          {
            id: `tab-${index}`,
            isActive: activeTab === index,
            controls: `panel-${index}`,
            onClick: () => setActiveTab(index),
          },
        );
      })}
    </div>
  );
};

export const TabsPanels = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const { activeTab } = useTabsContext();

  return (
    <div className={cn(className)}>
      {Children.map(children, (child, index) => {
        return React.cloneElement(
          child as React.ReactElement<TabPanelProps>,
          {
            id: `panel-${index}`,
            isActive: activeTab === index,
            labelledBy: `tab-${index}`,
          },
        );
      })}
    </div>
  );
};

type TabProps = {
  id?: string;
  isActive?: boolean;
  controls?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export const Tab = ({
  id,
  isActive,
  controls,
  onClick,
  children,
}: TabProps) => {
  return (
    <Button
      id={id}
      variant={isActive ? 'default' : 'text'}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={controls}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

type TabPanelProps = {
  id?: string;
  className?: string;
  isActive?: boolean;
  labelledBy?: string;
  children: React.ReactNode;
};

export const TabPanel = ({
  id,
  className,
  isActive,
  labelledBy,
  children,
}: TabPanelProps) => {
  return (
    <div
      id={id}
      className={cn(
        'hidden px-4 py-2',
        isActive && 'block',
        className,
      )}
      role="tabpanel"
      aria-labelledby={labelledBy}
      hidden={!isActive}
    >
      {children}
    </div>
  );
};
