import React from 'react';
import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBookmark, ThreadAPI } from '../../../apis';
import menuImg from '../../../assets/menu.png';
import useBookmarkPagination from '../../../hooks/useBookmarkPagination';
import { PopupContext } from '../../../provider/popupProvider';
import './BookmarkDetail.css';

export default function BookmarkDetailPage() {
  const { showConfirmPop } = useContext(PopupContext);
  const {
    list,
    setList,
    pagination,
    paginationInfo: { paginationLength, page },
  } = useBookmarkPagination();
  const bookmarkListRef = useRef(null);
  const [modifyValue, setModifyValue] = useState('');

  const navigate = useNavigate();

  const handleClickPopMenu = (item: any) => {
    setList((prevState) => {
      const idx = prevState.findIndex((listItem) => listItem.id === item.id);
      if (idx === -1) prevState;

      prevState = prevState.map((listItem, itemIdx) => ({
        ...listItem,
        active: itemIdx === idx ? !listItem?.active : false,
      }));
      return [...prevState];
    });
  };

  const handleClickModifyName = (item: any) => {
    if (item?.modify) {
      handleClickPopMenu(item);
    }

    const value = modifyValue;
    setList((prevState) => {
      const idx = prevState.findIndex((listItem) => listItem.id === item.id);
      if (idx === -1) prevState;

      prevState = prevState.map((listItem, itemIdx) => ({
        ...listItem,
        modify: itemIdx === idx ? !listItem?.modify : false,
        name: itemIdx === idx && item?.modify ? value : listItem.title,
      }));
      return [...prevState];
    });
    setModifyValue(() => item.name);
  };

  const handleDeleteItem = async (item: any) => {
    console.log('삭제...');
    showConfirmPop('정말 삭제 하시겠습니까?', async () => {
      try {
        const result = await ThreadAPI.deleteBookmark(item.id);
        console.log('result', result);
      } catch (error) {
        console.log('error', error);
      }
      setList((prevState) =>
        [...prevState].filter((listItem) => listItem.id !== item.id)
      );
    });
  };

  const popMenuClose = () => {
    setList((prevState) => {
      return [...prevState.map((item) => ({ ...item, active: false }))];
    });
  };

  const selectAll = () => {
    setList((prevState) => {
      return [...prevState.map((item) => ({ ...item, select: true }))];
    });
  };

  const toggleItem = (item: any) => {
    setList((prevState) => {
      return [
        ...prevState.map((listItem) => ({
          ...listItem,
          select:
            item.id === listItem.id ? !listItem?.select : listItem?.select,
        })),
      ];
    });
  };

  const moveBookmarkInfo = (item: IBookmark) => {
    navigate('/bookmark-info', {
      state: {
        uuid: item.id,
      },
    });
  };

  return (
    <div className={'bookmark-cover'}>
      <ul className={'bookmark-table w-full mb10'} ref={bookmarkListRef}>
        {list.map((item, idx) => {
          return (
            <li
              key={item.id}
              className={'flex' + (item?.select ? ' select' : '')}
              onClick={(e: any) => {
                !e.target.classList.contains('non-click') && toggleItem(item);
              }}
            >
              <div
                className={
                  'flex flex-direction-column justify-content-center align-items-center'
                }
              >
                <p>{item.id}</p>
              </div>
              <div
                className={'flex flex-direction-column justify-content-center'}
              >
                {item?.modify ? (
                  <input
                    type="text"
                    className={'modify-input non-click'}
                    value={modifyValue}
                    onInput={(e: any) => setModifyValue(e.target.value)}
                    placeholder={'새로운 이름을 입력하세요.'}
                  />
                ) : (
                  <p
                    className={'non-click'}
                    onClick={() => moveBookmarkInfo(item)}
                  >
                    {item.title}
                  </p>
                )}
              </div>
              <div
                className={
                  'flex flex-direction-column justify-content-center align-items-center'
                }
              >
                <p>생성일...</p>
              </div>
              <div
                className={
                  'flex flex-direction-column justify-content-center align-items-center'
                }
              >
                <button
                  className={'non-click'}
                  onClick={() => handleClickPopMenu(item)}
                >
                  <img className={'non-click'} src={menuImg} alt="menu" />
                </button>
                <ul
                  className={`pop-menu`}
                  style={{ display: item?.active ? 'block' : 'none' }}
                >
                  <li
                    className={
                      'non-click flex justify-content-start align-items-center'
                    }
                    onClick={() => handleClickModifyName(item)}
                  >
                    <p className={'non-click'}>이름 변경</p>
                  </li>
                  <li
                    className={
                      'non-click flex justify-content-start align-items-center'
                    }
                  >
                    <p
                      className={'non-click'}
                      onClick={() => handleDeleteItem(item)}
                    >
                      삭제
                    </p>
                  </li>
                </ul>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={'flex justify-content-end align-items-center'}>
        <button className={'all-selected-btn'} onClick={() => selectAll()}>
          전체 선택
        </button>
      </div>

      {/* Pagination 추가 */}
      <div className="pagination-container">
        {[...Array(paginationLength)].map((_, index) => (
          <button
            key={index}
            className={`pagination-btn ${page === index + 1 ? 'active' : ''}`}
            onClick={() => pagination({ page: index + 1 })}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
