import React,{ useContext } from 'react';
import { MyProfileContext } from '../../provider/myProfileProvider';
import BookmarkDetailPage from './Bookmark/BookmarkDetailPage';
import TrashDetailPage from './Trash/TrashDetailPage';
import UserFormDetailPage from './UserForm';

// useContext에서 선택된 activeTab에 따른 컴포넌트 보여주는 컴포넌트.
export default function MyPageView() {
  const { activeTab } = useContext(MyProfileContext);

  switch (activeTab) {
    case 'bookmarks':
      return <BookmarkDetailPage />;
    case 'profile':
      return <UserFormDetailPage />;
    case 'trash':
      return <TrashDetailPage />;
    default:
      return <h1>잘못된 값이 선택 되었습니다.</h1>;
  }
}
