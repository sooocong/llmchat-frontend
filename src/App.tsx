import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ThreadContextProvider } from './context';
import MyProfileProvider from './provider/myProfileProvider';
import PopupProvider from './provider/popupProvider';

function App() {
  useEffect(() => {
    // 웹뷰 환경 감지 및 speechSynthesis 비활성화
    if (
      typeof window !== 'undefined' &&
      window.navigator &&
      window.navigator.userAgent
    ) {
      const isWebView = /wv|Android|iPhone|iPad|iPod|Mobile|iOS/.test(
        navigator.userAgent
      );
      if (isWebView) {
        // 웹뷰 환경에서는 speechSynthesis를 비활성화
        // (window as any).speechSynthesis = null;
      }
    }
  }, []);

  return (
    <ThreadContextProvider>
      <MyProfileProvider>
        <PopupProvider>
          <Outlet />
        </PopupProvider>
      </MyProfileProvider>
    </ThreadContextProvider>
  );
}

export default App;
