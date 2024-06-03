import React, { useCallback, useState } from 'react';
import styles from './SearchBar.module.css';
import { ReactComponent as SearchIcon } from '../../../assets/search.svg';
import { ReactComponent as HamburgerIcon } from '../../../assets/hamburger.svg';
import _ from 'lodash';
import { ThreadAPI } from '../../../apis';

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [searchedThreads, setSearchedThreads] = useState<IThread[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const getSearchedThreads = async (query: string) => {
    try {
      const response = await ThreadAPI.getSearchedThreadList(query);
      setSearchedThreads(response);
    } catch (error) {
      console.error(error);
    }
  };

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
  };

  const handleInputFocus = () => {
    setIsModalOpen(true);
  };

  const highlightMatch = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    console.log(parts);
    return parts.map((part: string, index: number) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className={styles.highlight}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <form className={styles.form}>
      <HamburgerIcon width="24" height="24" />
      <input
        className={styles.input}
        type="search"
        placeholder="Hinted search text"
        value={inputValue}
        onChange={handleInputChange}
        // onBlur={handleInputBlur}
        onFocus={handleInputFocus}
      />
      {isModalOpen && searchedThreads.length > 0 && (
        <ul className={styles.searchList}>
          {searchedThreads.map((thread: IThread, index) => (
            <div key={index} className={styles.searchItem}>
              {highlightMatch(thread.chatName, inputValue)}
            </div>
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
