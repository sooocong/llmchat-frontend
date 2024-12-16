import { useContext, useRef, useState } from 'react';
import { ThreadAPI } from '../../../apis';
import SearchIcon from '../../../assets/icons/search-icon.png';
import useTrashPagination from '../../../hooks/useTrashPagination';
import { PopupContext } from '../../../provider/popupProvider';
import "./trashDetail.css";

export default function TrashDetailPage() {
  const { showConfirmPop, showCommonPop } = useContext(PopupContext);
  const { list, setList, pagination, paginationInfo: { paginationLength, page } } = useTrashPagination();

  const selectAll = () => {
    setList((prevState) => {
      return [...prevState.map(item => ({ ...item, selected: true }))];
    })
  }

  const handleClickItem = (item: any) => {
    setList((prevState) => {
      return [...prevState.map(listItem => ({ ...listItem, selected: item?.id === listItem.id ? !listItem?.selected : listItem?.selected }))];
    })
  }

  const handleClickRestore = () => {
    const targetList = list.filter(item => item.selected);
    if (targetList.length === 0) return showCommonPop("복원할 채팅을 선택해주세요.", null);

    showConfirmPop("복원하시겠습니까?", async () => {

      for (const target of targetList) {
        try {
          const result = await ThreadAPI.restoreThread(target.id);
          console.log('result', result);
          window.location.reload();
        } catch (error) {
          console.log('error', error);
        }
      }

      setList((prevState) => ([...prevState].filter(listItem => targetList.findIndex(item => item.id === listItem.id) === -1)));
    });
  }

  return (
    <div className={'trash-detail-container'}>
      <div className={'search-container w-full flex justify-content-between mb10'}>
        <div></div>
        <Search pagination={pagination} />
      </div>
      <div>
        <table className={'trash-table w-full mb10'}>
          <colgroup>
            <col width="5%" />
            <col width="auto" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <thead className='bg-[#08A386]'>
            <tr>
              <th>번호</th>
              <th>채팅 이름</th>
              <th>채팅 생성일</th>
              <th>채팅 삭제일</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => {
              return (
                <tr key={item.id} className={item?.selected ? 'selected' : ''} onClick={(e) => handleClickItem(item)}>
                  <td>
                    <p>{item.id}</p>
                  </td>
                  <td>
                    <p>{item.chatName}</p>
                  </td>
                  <td>
                    <p>{item.createdAt}</p>
                  </td>
                  <td>
                    <p>{item.updatedAt}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={'flex justify-content-between mb20'}>
          <div></div>
          <div className={'flex justify-content-center align-items-center'}>
            <button className={'trash-btn mr10'} onClick={() => selectAll()}>전체선택</button>
            <button className={'trash-btn'} onClick={() => handleClickRestore()}>복원</button>
          </div>
        </div>

        {/* 페이지네이션 버튼 추가 */}
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
    </div>
  );
}

function Search(props: any) {
  const { pagination } = props;
  const interval = useRef<any>(null);
  const [search, setSearch] = useState('');

  const handleSearch = (value: string) => {
    setSearch(value);
    if (interval.current) clearTimeout(interval.current);
    interval.current = setTimeout(() => {
      console.log('value~~', value);
      pagination && pagination({ searchValue: value })
    }, 500);
  }

  return <div className={'search-container'}>
    <input
      type="text"
      className={'trash-search'}
      placeholder={'채팅 검색'}
      value={search}
      onChange={(e) => handleSearch(e.target.value)}
    />
    <button className={'search-button'}>
      <img src={SearchIcon} alt="" />
    </button>
  </div>;
}
