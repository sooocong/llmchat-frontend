import React, { useEffect, useRef, useState } from 'react';



const TEMP_DATA = [
  {
    uuid: 'asfas-asd1',
    type: 1,
    name: '영상편집',
    createDate: '2023.12.28'
  },
  {
    uuid: 'asfas-asd222',
    type: 2,
    name: 'Fasoo',
    createDate: '2023.12.28'
  },
  {
    uuid: 'asfas-vkbic',
    type: 3,
    name: '사진 찍는 요령',
    createDate: '2023.12.28'
  },
  {
    uuid: 'asfas-vkbic-asdasd',
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
    paginationLength: 10, // 여기서 10개까지 설정
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
    console.log('get data');
  }, [paginationInfo]);

  return {
    list,
    setList,
    pagination,
    paginationInfo
  }

}
