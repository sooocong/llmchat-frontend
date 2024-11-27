import React, { useState } from 'react';
import styles from './SortOptions.module.css';
import { ReactComponent as ArrowDownIcon } from '../../../assets/arrow-down.svg';
import { useHideByClickOutside, useThreads } from '../../../hooks';
interface ISortOptions {
  cb: (sort: SortType) => void;
}
function SortOptions({ cb }: ISortOptions) {
  const SELECT_OPTIONS = { desc: '최신순', asc: '오래된 순' };
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState('최신순');

  const modalRef = useHideByClickOutside(() => {
    setIsOpen(false);
  }, '.' + styles.selectBox);

  const openOption = () => {
    setIsOpen(!isOpen);
  };

  const selectSort = (sort: SortType = 'desc') => {
    setOption(SELECT_OPTIONS[sort]);
    cb(sort);
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.selectBox}>
      <button className={styles.label} onClick={openOption}>
        {option}
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
            최신순
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
