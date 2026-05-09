"use client";

import * as React from "react";

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ children, value, onValueChange, defaultValue }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue || value || "");
  
  const handleTabChange = (newValue: string) => {
    setActiveTab(newValue);
    onValueChange?.(newValue);
  };
  
  return (
    <div data-value={activeTab} onChange={(e: any) => handleTabChange(e.target.value)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { 
            activeTab, 
            onTabChange: handleTabChange 
          });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList: React.FC<{ children: React.ReactNode; className?: string; activeTab?: string; onTabChange?: (value: string) => void }> = ({ 
  children, className, activeTab, onTabChange 
}) => {
  return (
    <div className={`flex gap-1 p-1 bg-slate-100 rounded-lg ${className || ''}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { activeTab, onTabChange });
        }
        return child;
      })}
    </div>
  );
};

export const TabsTrigger: React.FC<{ 
  value: string; 
  children: React.ReactNode; 
  className?: string;
  activeTab?: string;
  onTabChange?: (value: string) => void;
}> = ({ value, children, className, activeTab, onTabChange }) => {
  const isActive = activeTab === value;
  
  return (
    <button
      type="button"
      onClick={() => onTabChange?.(value)}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive 
          ? "bg-white text-foreground shadow-sm" 
          : "text-muted-foreground hover:text-foreground"
      } ${className || ''}`}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<{ 
  value: string; 
  children: React.ReactNode; 
  className?: string;
  activeTab?: string;
}> = ({ value, children, className, activeTab }) => {
  if (activeTab !== value) return null;
  
  return <div className={className}>{children}</div>;
};

export default Tabs;