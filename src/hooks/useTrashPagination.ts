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
<<<<<<< HEAD
    paginationLength: 10,
=======
    paginationLength: 6,
>>>>>>> ea18b396e5ae9996731714964db9bb61ac3416bf
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
<<<<<<< HEAD
    console.log('get trash data');
=======
    (async () => {
      const list = await getList();
      // ...
    })
>>>>>>> ea18b396e5ae9996731714964db9bb61ac3416bf
  }, [paginationInfo]);

  return {
    list,
    setList,
    pagination,
    paginationInfo
  }

}
