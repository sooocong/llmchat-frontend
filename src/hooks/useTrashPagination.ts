// src/hooks/useTrashPagination.ts
import { useState, useEffect } from "react";

const TEMP_DATA = [
  { no: 1, name: "영어 번역", createDate: "2023-12-01", deleteDate: "2023-12-15" },
  { no: 2, name: "프랑스어 번역", createDate: "2023-12-02", deleteDate: "2023-12-16" },
  { no: 3, name: "스페인어 번역", createDate: "2023-12-03", deleteDate: "2023-12-17" },
  { no: 4, name: "일본어 번역", createDate: "2023-12-04", deleteDate: "2023-12-18" },
  { no: 5, name: "중국어 번역", createDate: "2023-12-05", deleteDate: "2023-12-19" },
  { no: 6, name: "독일어 번역", createDate: "2023-12-06", deleteDate: "2023-12-20" },
];

export default function useTrashPagination() {
  const [list, setList] = useState<Array<any>>(TEMP_DATA); // 전체 데이터
  const [paginationInfo, setPaginationInfo] = useState({
    page: 1,
    pagePerLength: 5, // 한 페이지당 6개의 아이템
    paginationLength: 1,
  });

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

  const currentPageList = list.slice(
    (paginationInfo.page - 1) * paginationInfo.pagePerLength,
    paginationInfo.page * paginationInfo.pagePerLength
  );

  return {
    list: currentPageList,
    setList,
    pagination,
    paginationInfo,
  };
}
