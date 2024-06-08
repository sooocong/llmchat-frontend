import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './SearchBar.module.css';
import { ReactComponent as SearchIcon } from '../../../assets/search.svg';
import { ReactComponent as HamburgerIcon } from '../../../assets/hamburger.svg';
import _ from 'lodash';
import { useThreads } from '../../../hooks';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchListRef = useRef<HTMLUListElement>(null);
  const navigation = useNavigate();
  const { searchedThreads, getSearchedThreads, openThread } = useThreads();

  const debouncedGetSearchedThreads = useCallback(
    _.debounce((query: string) => getSearchedThreads(query), 300),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      setIsModalOpen(true);
      debouncedGetSearchedThreads(value);
    } else {
      setIsModalOpen(false);
    }
  };

  const handleInputBlur = () => {
    setIsModalOpen(false);
    setFocusedIndex(-1);
  };

  const handleInputFocus = () => {
    setIsModalOpen(true);
  };

  const handleSearchResultClick = (id: number) => {
    setIsModalOpen(false);
    setInputValue('');
    setFocusedIndex(-1);
    openThread(id);
    navigation('/');
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
          <span key={index} className={styles.highlight}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (trimmedInput === '') {
      return;
    }
    setIsModalOpen(false);
    setInputValue('');
    navigation(`/search/${inputValue}`);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>
  ) => {
    if (searchedThreads.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex(
          (prevIndex) => (prevIndex + 1) % searchedThreads.length
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex(
          (prevIndex) =>
            (prevIndex - 1 + searchedThreads.length) % searchedThreads.length
        );
      } else if (e.key === 'Enter' && focusedIndex >= 0) {
        e.preventDefault();
        handleSearchResultClick(searchedThreads[focusedIndex].id);
      }
    }
  };

  useEffect(() => {
    if (focusedIndex >= 0 && searchListRef.current) {
      const focusedItem = searchListRef.current.children[
        focusedIndex
      ] as HTMLElement;
      const { offsetTop, offsetHeight } = focusedItem;
      const { scrollTop, clientHeight } = searchListRef.current;

      if (offsetTop < scrollTop) {
        searchListRef.current.scrollTop = offsetTop;
      } else if (offsetTop + offsetHeight > scrollTop + clientHeight) {
        searchListRef.current.scrollTop =
          offsetTop + offsetHeight - clientHeight;
      }
    }
  }, [focusedIndex]);

  return (
    <form className={styles.form} onSubmit={handleSearchSubmit}>
      <HamburgerIcon width="24" height="24" />
      <input
        className={styles.input}
        type="search"
        placeholder="Hinted search text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
      />
      {isModalOpen && searchedThreads.length > 0 && (
        <ul className={styles.searchList} ref={searchListRef}>
          {searchedThreads.map((thread: ISearch, index) => (
            <li
              key={index}
              className={`${styles.searchItem}${focusedIndex === index ? ' ' + styles.isActive : ''}`}
              onMouseDown={() => {
                handleSearchResultClick(thread.id);
                console.log('thread.id ', thread.id);
              }}
            >
              <div>{highlightMatch(thread.chatName, inputValue)}</div>
              <div>{highlightMatch(thread.matchHighlight, inputValue)}</div>
            </li>
          ))}
        </ul>
      )}
      <button className={styles.button} type="submit">
        <SearchIcon width="24" height="24" />
      </button>
    </form>
  );
}

export { SearchBar };
