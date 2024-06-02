import React,{ createContext, useState } from 'react';

type IActiveTab = 'profile' | 'trash' | 'bookmarks';
interface IMyProfileProvider {
  activeTab: IActiveTab;
  handleTabClick: (tabName: IActiveTab) => void;
}

export type {
  IActiveTab,
  IMyProfileProvider
}

const MyProfileContext = createContext<IMyProfileProvider>({
  activeTab: 'trash',
  handleTabClick: () => null,
});

export { MyProfileContext }


export default function MyProfileProvider(props: any) {
  const { children } = props;
  const [activeTab, setActiveTab] = useState<IActiveTab>("trash");

  const handleTabClick = (tabName: IActiveTab) => {
    setActiveTab(tabName);
  };

  return (
    <MyProfileContext.Provider value={{ activeTab, handleTabClick }}>
      {children}
    </MyProfileContext.Provider>
  )
}
