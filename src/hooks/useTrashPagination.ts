import React, { useEffect, useRef, useState } from 'react';

const TEMP_DATA = [
  {
    no: 1,
    name: '영어 번역',
    createDate: '2023.12.28',
    deleteDate: '2024.12.28',
  },
  {
    no: 2,
    name: '영어 번역',
    createDate: '2023.12.28',
    deleteDate: '2024.12.28',
  }
];
export default function useTrashPagination() {
  const [list, setList] = useState<Array<any>>(TEMP_DATA);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    page: 1,
    pagePerLength: 10, // 한 페이지당 보여줄 아이템,
    searchValue: '',
    paginationLength: 6,
  })

  const pagination = (newPaginationInfo: any) => {
    setPaginationInfo((prevState) => ({
      ...prevState,
      ...newPaginationInfo
    }));
  }

  // 서버에서 가져올 데이터
  const getList = async () => {
    return [];
  }

  useEffect(() => {
    (async () => {
      const list = await getList();
      // ...
    })
  }, [paginationInfo]);

  return {
    list,
    setList,
    pagination,
    paginationInfo
  }

}
