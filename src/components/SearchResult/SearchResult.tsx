import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import style from './SearchResult.module.css';
import { SearchBar } from '..';
import { useThreads } from '../../hooks';
import { highlightMatch } from '../../utils';
import { SortOptions } from '../Sidebar';

export const SearchResult = () => {
  const [sortBy, setSortBy] = useState<'recent' | 'oldest'>('recent');
  const handleSortByChange = (sort: SortType) => {
    setSortBy(sort === 'desc' ? 'recent' : 'oldest');
  };
  const navigation = useNavigate();
  const { openThread, searchMessage } = useThreads();
  const { searchedThreads, query } = useLoaderData() as {
    searchedThreads: ISearch[];
    query: string;
  };

  const renderSearchItems = () => {
    const sortedResults =
      sortBy === 'recent'
        ? [...searchedThreads].sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
        : [...searchedThreads].sort(
            (a, b) =>
              new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );

    return sortedResults.map((item) => (
      <div
        key={item.id}
        className={style.itemContainer}
        onClick={() => {
          handleThreadOpen(item.id, item.messageIdIndex);
        }}
      >
        <div className={style.answerIcon}></div>
        <div className={style.itemContent}>
          <div className={style.title}>
            {item.messageId === null
              ? highlightMatch(item.chatName, query, style.highlight)
              : item.chatName}
          </div>
          <div className={style.content}>
            {highlightMatch(item.matchHighlight, query, style.highlight)}
          </div>
        </div>
      </div>
    ));
  };

  const handleThreadOpen = (
    threadId: number,
    messageIdIndex: number | null
  ) => {
    openThread(threadId);
    searchMessage(messageIdIndex);
    navigation('/');
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.topBar}>
          <SearchBar />
          <div>
            <div className={style.resultCount}>
              검색 결과: {searchedThreads.length}개
            </div>
            <SortOptions cb={handleSortByChange} />
          </div>
        </div>

        {renderSearchItems()}
      </div>
    </>
  );
};
