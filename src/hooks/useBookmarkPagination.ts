import { useEffect, useState } from 'react';

const TEMP_DATA = [
  { type: 1, name: '영상편집', createDate: '2023.12.28' },
  { type: 2, name: 'Fasoo', createDate: '2023.12.28' },
  { type: 3, name: '사진 찍는 요령', createDate: '2023.12.28' },
  { type: 4, name: '영어 번역4', createDate: '2023.12.28' },
  { type: 5, name: '디자인 가이드', createDate: '2023.12.28' },
  { type: 6, name: 'Figma 프로젝트', createDate: '2023.12.28' }
];

export default function useBookmarkPagination() {
  const [list, setList] = useState<Array<any>>(TEMP_DATA);
  const [paginationInfo, setPaginationInfo] = useState({
    page: 1,
    pagePerLength: 5, 
    paginationLength: Math.ceil(TEMP_DATA.length / 5)
  });

  const pagination = (newPaginationInfo: any) => {
    setPaginationInfo((prevState) => ({
      ...prevState,
      ...newPaginationInfo
    }));
  };

  const currentPageList = list.slice(
    (paginationInfo.page - 1) * paginationInfo.pagePerLength,
    paginationInfo.page * paginationInfo.pagePerLength
  );

  useEffect(() => {
    setPaginationInfo((prevState) => ({
      ...prevState,
      paginationLength: Math.ceil(list.length / prevState.pagePerLength)
    }));
  }, [list]);

  return {
    list: currentPageList,
    setList,
    pagination,
    paginationInfo
  };
}
