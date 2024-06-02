import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  Children,
} from 'react';
import { cn } from '../utils/cn';

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
    <div className="flex">
      {Children.map(children, (child, index) => {
        return React.cloneElement(
          child as React.ReactElement<TabProps>,
          {
            isActive: activeTab === index,
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
            isActive: activeTab === index,
          },
        );
      })}
    </div>  
  );
};

type TabProps = {
  isActive?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

export const Tab = ({ isActive, onClick, children }: TabProps) => {
  return (
    <button
      className={cn(
        'flex items-center justify-center rounded-xl px-4 py-2 font-medium transition-colors duration-150 ease-in-out',
        isActive && 'bg-active',
      )}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

type TabPanelProps = {
  className?: string;
  isActive?: boolean;
  children: React.ReactNode;
};

export const TabPanel = ({
  className,
  isActive,
  children,
}: TabPanelProps) => {
  return (
    <div
      className={cn(
        'hidden px-4 py-2',
        isActive && 'block',
        className,
      )}
    >
      {children}
    </div>
  );
};
