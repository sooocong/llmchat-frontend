import React, { useState } from 'react';
import styles from './SortOptions.module.css';
import { ReactComponent as ArrowDownIcon } from '../../../assets/arrow-down.svg';
import { useHideByClickOutside, useThreads } from '../../../hooks';

function SortOptions() {
  const SELECT_OPTIONS = { desc: '최근순', asc: '오래된 순' };
  const { resetThread, sort } = useThreads();
  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useHideByClickOutside(() => {
    setIsOpen(false);
  }, '.' + styles.selectBox);

  const openOption = () => {
    setIsOpen(!isOpen);
  };

  const selectSort = (sort: SortType = 'desc') => {
    resetThread(sort);
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.selectBox}>
      <button className={styles.label} onClick={openOption}>
        {SELECT_OPTIONS[sort]}
        <ArrowDownIcon width="7.29" height="3.9" />
      </button>
      {isOpen && (
        <ul ref={modalRef} className={styles.optionList}>
          <li
            className={styles.optionItem}
            onClick={() => {
              selectSort('desc');
            }}
          >
            최근순
          </li>
          <li
            className={styles.optionItem}
            onClick={() => {
              selectSort('asc');
            }}
          >
            오래된순
          </li>
        </ul>
      )}
    </div>
  );
}

export { SortOptions };
