import { useEffect, useState } from 'react';
import { IBookmark, ThreadAPI } from '../apis';

const TEMP_DATA = [
  { type: 1, name: '영상편집', createDate: '2023.12.28' },
  { type: 2, name: 'Fasoo', createDate: '2023.12.28' },
  { type: 3, name: '사진 찍는 요령', createDate: '2023.12.28' },
  { type: 4, name: '영어 번역4', createDate: '2023.12.28' },
  { type: 5, name: '디자인 가이드', createDate: '2023.12.28' },
  { type: 6, name: 'Figma 프로젝트', createDate: '2023.12.28' }
];

export default function useBookmarkPagination() {
  const [list, setList] = useState<Array<IBookmark>>([]);
  const [paginationInfo, setPaginationInfo] = useState({
    page: 0,
    pagePerLength: 5, 
    paginationLength: Math.ceil(TEMP_DATA.length / 5)
  });

  useEffect(() => {
    const getList = async () => {
      console.log('paginationInfo', paginationInfo);
      const result = await ThreadAPI.paginationBookmark(paginationInfo.page, paginationInfo.pagePerLength);
      setList(result.content);
      setPaginationInfo((prevState) => ({
        ...prevState,
        paginationLength: result.totalPages
      }));
    };
    getList();
  }, [paginationInfo.page, paginationInfo.pagePerLength]);

  console.log("list", list)

  const pagination = (newPaginationInfo: any) => {
    setPaginationInfo((prevState) => ({
      ...prevState,
      ...newPaginationInfo
    }));
  };

  return {
    list,
    setList,
    pagination,
    paginationInfo
  };
}
