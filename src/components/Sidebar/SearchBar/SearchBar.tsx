import React from 'react';
import styles from './SearchBar.module.css';
import { ReactComponent as SearchIcon } from '../../../assets/search.svg';
import { ReactComponent as HamburgerIcon } from '../../../assets/hamburger.svg';

function SearchBar() {
  return (
    <form className={styles.form}>
      <HamburgerIcon width="24" height="24" />
      <input
        className={styles.input}
        type="search"
        placeholder="Hinted search text"
      />
      <button className={styles.button} type="submit">
        <SearchIcon width="24" height="24" />
      </button>
    </form>
  );
}

export { SearchBar };
