// src/hooks/useTrashPagination.ts
import { useEffect, useState } from "react";
import { ThreadAPI } from "../apis";

function isoToCustomFormat(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
}


export default function useTrashPagination() {
  const [list, setList] = useState<Array<IThread>>([]); // 전체 데이터
  const [paginationInfo, setPaginationInfo] = useState({
    page: 0,
    pagePerLength: 5, // 한 페이지당 6개의 아이템
    paginationLength: 1,
    searchValue: ''
  });

  useEffect(() => {
    const getList = async () => {
      console.log('paginationInfo', paginationInfo);
      const result = await ThreadAPI.paginationThreadDeleted(paginationInfo.page, paginationInfo.pagePerLength, paginationInfo.searchValue);
      console.log('result', result);
      result.content = result.content.map((item) => ({ ...item, createdAt: isoToCustomFormat(item.createdAt), updatedAt: isoToCustomFormat(item.updatedAt) }));
      setList(result.content);
      setPaginationInfo((prevState) => ({
        ...prevState,
        paginationLength: result.totalPages
      }));
    };
    getList();
  }, [paginationInfo.page, paginationInfo.pagePerLength, paginationInfo.searchValue]);

  useEffect(() => {
    setPaginationInfo((prevState) => ({
      ...prevState,
      paginationLength: Math.ceil(list.length / prevState.pagePerLength),
    }));
  }, [list]);

  const pagination = (newPaginationInfo: any) => {
    setPaginationInfo((prevState) => ({
      ...prevState,
      ...newPaginationInfo,
    }));
  };

  return {
    list,
    setList,
    pagination,
    paginationInfo,
  };
}
