import React, { useContext, useRef, useState } from 'react';
import useBookmarkPagination from '../../../hooks/useBookmarkPagination';
import "./BookmarkDetail.css";
import menuImg from '../../../assets/menu.png';
import Pagination from '../../Pagination';
import { PopupContext } from '../../../provider/popupProvider';
import { useNavigate } from 'react-router-dom';

export default function BookmarkDetailPage() {
  const { showConfirmPop } = useContext(PopupContext);
  const { list, setList, pagination, paginationInfo: { paginationLength, page } } = useBookmarkPagination();
  const bookmarkListRef = useRef(null);
  const [modifyValue, setModifyValue] = useState("");

  const navigate = useNavigate();

  const handleClickPopMenu = (item: any) => {
    setList((prevState) => {
      const idx = prevState.findIndex(listItem => listItem.type === item.type);
      if (idx === -1) prevState;

      prevState = prevState.map((listItem, itemIdx) => ({ ...listItem, active: itemIdx === idx ? !listItem?.active : false }))
      return [...prevState];
    })
  }

  const handleClickModifyName = (item: any) => {
    if (item?.modify) {
      handleClickPopMenu(item);
    }

    const value = modifyValue;
    setList((prevState) => {
      const idx = prevState.findIndex(listItem => listItem.type === item.type);
      if (idx === -1) prevState;

      prevState = prevState.map((listItem, itemIdx) => ({
        ...listItem,
        modify: itemIdx === idx ? !listItem?.modify : false,
        name: itemIdx === idx && item?.modify ? value : listItem.name,
      }))
      return [...prevState];
    })
    setModifyValue(() => item.name)
  }

  const handleDeleteItem = async (item: any) => {
    showConfirmPop("정말 삭제 하시겠습니까?", async () => {
      setList((prevState) => ([...prevState].filter(listItem => listItem.type !== item.type)))
    })
  }

  const popMenuClose = () => {
    setList((prevState) => {
      return [...prevState.map(item => ({ ...item, active: false }))];
    })
  }

  const selectAll = () => {
    setList((prevState) => {
      return [...prevState.map(item => ({ ...item, select: true }))];
    })
  }

  const toggleItem = (item: any) => {
    setList((prevState) => {
      return [...prevState.map(listItem => ({ ...listItem, select: item.type === listItem.type ? !listItem?.select : listItem?.select }))];
    })
  }

  const moveBookmarkInfo = (item: any) => {
    navigate("/bookmark-info", {
      state: {
        uuid: item.uuid,
      }
    })
  }

  return (
    <div className={'bookmark-cover'}>
      <ul className={'bookmark-table w-full mb10'} ref={bookmarkListRef}>
        {list.map((item, idx) => {
          return (
            <li key={item.type} className={'flex' + (item?.select ? ' select' : '')} onClick={(e: any) => {
              !e.target.classList.contains("non-click") && toggleItem(item)
            }}>
              <div className={'flex flex-direction-column justify-content-center align-items-center'}>
                <p>{item.type}</p>
              </div>
              <div className={'flex flex-direction-column justify-content-center'}>
                {item?.modify ?
                  <input type="text" className={'modify-input non-click'} value={modifyValue} onInput={(e: any) => setModifyValue(e.target.value)} placeholder={'새로운 이름을 입력하세요.'} />
                  : <p className={'non-click'} onClick={() => moveBookmarkInfo(item)}>{item.name}</p>}
              </div>
              <div className={'flex flex-direction-column justify-content-center align-items-center'}>
                <p>{item.createDate}</p>
              </div>
              <div className={'flex flex-direction-column justify-content-center align-items-center'}>
                <button className={'non-click'} onClick={() => handleClickPopMenu(item)}>
                  <img className={'non-click'} src={menuImg} alt="menu" />
                </button>
                <ul className={`pop-menu`} style={{ display: item?.active ? 'block' : 'none' }}>
                  <li className={'flex justify-content-start align-items-center'} onClick={() => handleClickModifyName(item)}>
                    <p className={'non-click'}>이름 변경</p>
                  </li>
                  <li className={'flex justify-content-start align-items-center'}>
                    <p className={'non-click'} onClick={() => handleDeleteItem(item)}>삭제</p>
                  </li>
                </ul>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={'flex justify-content-end align-items-center'}>
        <button className={'all-selected-btn'} onClick={() => selectAll()}>전체 선택</button>
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
