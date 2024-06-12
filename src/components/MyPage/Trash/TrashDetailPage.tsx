import React, { useRef, useState } from 'react';
import "./trashDetail.css";
import SearchIcon from '../../../assets/icons/search-icon.png';
import useTrashPagination from '../../../hooks/useTrashPagination';
import Pagination from '../../Pagination';
export default function TrashDetailPage() {
  const { list, setList, pagination, paginationInfo: { paginationLength, page } } = useTrashPagination();

  const selectAll = () => {
    setList((prevState) => {
      return [...prevState.map(item => ({...item, selected:true}))];
    })
  }

  const handleClickItem = (item: any) => {
    setList((prevState) => {
      return [...prevState.map(listItem => ({...listItem, selected:item?.no === listItem.no ? !listItem?.selected : listItem?.selected}))];
    })
  }

  console.log('pagination', pagination, list);

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
          <thead>
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
              <tr key={item.no} className={item?.selected ? 'selected' : ''} onClick={(e) => handleClickItem(item)}>
                <td>
                  <p>{item.no}</p>
                </td>
                <td>
                  <p>{item.name}</p>
                </td>
                <td>
                  <p>{item.createDate}</p>
                </td>
                <td>
                  <p>{item.deleteDate}</p>
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
            <button className={'trash-btn'}>복원</button>
          </div>
        </div>
<<<<<<< HEAD
        <Pagination paginationLength={paginationLength} page={page} pagination={pagination} />
=======
        <Pagination paginationLength={paginationLength} page={page} />
>>>>>>> ea18b396e5ae9996731714964db9bb61ac3416bf
      </div>
    </div>
  );
}

function Search(pagination: any) {
  const interval = useRef<any>(null);
  const [search, setSearch] = useState('');

  // 추후 api 에 검색 기능 연동할 때 적용하기 위해 미리 디바운스 기능 구현
  const handleSearch = (value: string) => {
    setSearch(value);
    if (interval.current) clearInterval(interval.current);
    interval.current = setInterval(() => {
      console.log('value~~', value);
      pagination({ searchValue: value })
    }, 500);
  }

  return <div className={'search-container'}>
    <input type="text" className={'trash-search'} placeholder={'채팅 검색'} value={search}
           onChange={(e) => handleSearch(e.target.value)} />
    <button className={'search-button'}><img src={SearchIcon} alt="" /></button>
  </div>;
}
