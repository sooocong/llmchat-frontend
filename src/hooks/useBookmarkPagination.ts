import React, { useEffect, useRef, useState } from 'react';



const TEMP_DATA = [
  {
<<<<<<< HEAD
    uuid: 'asfas-asd1',
=======
>>>>>>> ea18b396e5ae9996731714964db9bb61ac3416bf
    type: 1,
    name: '영상편집',
    createDate: '2023.12.28'
  },
  {
<<<<<<< HEAD
    uuid: 'asfas-asd222',
=======
>>>>>>> ea18b396e5ae9996731714964db9bb61ac3416bf
    type: 2,
    name: 'Fasoo',
    createDate: '2023.12.28'
  },
  {
<<<<<<< HEAD
    uuid: 'asfas-vkbic',
=======
>>>>>>> ea18b396e5ae9996731714964db9bb61ac3416bf
    type: 3,
    name: '사진 찍는 요령',
    createDate: '2023.12.28'
  },
  {
<<<<<<< HEAD
    uuid: 'asfas-vkbic-asdasd',
=======
>>>>>>> ea18b396e5ae9996731714964db9bb61ac3416bf
    type: 4,
    name: '영어 번역4',
    createDate: '2023.12.28'
  }
];
export default function useBookmarkPagination() {
  const [list, setList] = useState<Array<any>>(TEMP_DATA);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    page: 1,
    pagePerLength: 10, // 한 페이지당 보여줄 아이템,
    searchValue: '',
<<<<<<< HEAD
    paginationLength: 10, // 여기서 10개까지 설정
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
    console.log('get data');
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
