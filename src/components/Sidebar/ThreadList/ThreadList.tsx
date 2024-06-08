import React, { Fragment } from 'react';
import styles from './ThreadList.module.css';
import { ThreadItem } from '../ThreadItem';
import { useIntersectionObserver, useThreads } from '../../../hooks';
import { isSameDate, isoToCustomFormat } from '../../../utils';

function ThreadList() {
  const { threads, getInfiniteThreads, isLoading, isError } = useThreads();
  const handleIntersection = () => {
    if (!isLoading) {
      getInfiniteThreads();
    }
  };

  const ref = useIntersectionObserver({ callback: handleIntersection });

  return (
    <ul className={styles.HistoryList}>
      {threads?.map((data, i) => {
        if (
          i == 0 ||
          !isSameDate(
            new Date(data.updatedAt),
            new Date(threads[i - 1].updatedAt)
          )
        )
          return (
            <Fragment key={data.id}>
              <li className={styles.HistoryDate}>
                {isoToCustomFormat(new Date(data.updatedAt))}
              </li>
              <ThreadItem history={data} />
            </Fragment>
          );
        else return <ThreadItem key={data.id} history={data} />;
      })}
      {isError ? (
        '에러 발생'
      ) : (
        <li style={{ minHeight: '10px' }} ref={ref}></li>
      )}
    </ul>
  );
}

export { ThreadList };
