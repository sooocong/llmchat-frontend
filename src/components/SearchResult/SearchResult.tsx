import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import style from './SearchResult.module.css';
import { SearchBar } from '..';
import { useThreads } from '../../hooks';

export const SearchResult = () => {
  const [sortBy, setSortBy] = useState<'recent' | 'oldest'>('recent');
  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'recent' | 'oldest');
  };
  const navigation = useNavigate();
  const { openThread } = useThreads();
  const { searchedThreads, query } = useLoaderData() as {
    searchedThreads: ISearch[];
    query: string;
  };

  const highlightMatch = (text: string, query: string) => {
    const markdownPatterns = [
      '\\*\\*', // bold
      '\\*', // italic
      '__', // bold
      '_', // italic
      '`', // inline code
      '\\[.*?\\]\\(.*?\\)', // link
      '!\\[.*?\\]\\(.*?\\)', // image
      '#+', // header
      '>+', // blockquote
      '[-*+]', // unordered list
      '\\d+\\.', // ordered list
      '---', // horizontal rule
    ];
    const patterns = [query, ...markdownPatterns];
    const regexPattern = patterns.join('|');
    const parts = text.split(new RegExp(`(${regexPattern})`, 'gi'));
    return parts.map((part: string, index: number) => {
      if (new RegExp(markdownPatterns.join('|')).test(part)) {
        return '';
      }
      if (part.toLowerCase() === query.toLowerCase()) {
        return (
          <span key={index} className={style.highlight}>
            {part}
          </span>
        );
      }
      return part;
    });
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
          handleThreadOpen(item.id);
        }}
      >
        <div className={style.title}>{item.chatName}</div>
        <div className={style.content}>
          {highlightMatch(item.matchHighlight, query)}
        </div>
      </div>
    ));
  };

  const handleThreadOpen = (threadId: number) => {
    openThread(threadId);
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
            <select
              value={sortBy}
              onChange={handleSortByChange}
              className={style.select}
            >
              <option value="recent">최신순</option>
              <option value="oldest">오래된순</option>
            </select>
          </div>
        </div>

        {renderSearchItems()}
      </div>
    </>
  );
};
