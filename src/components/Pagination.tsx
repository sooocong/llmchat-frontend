import React from 'react';
import "./pagination.css";

export default function Pagination(props: any) {
<<<<<<< HEAD
  const { paginationLength, page, className, pagination } = props;


  const moveFirst = () => pagination({ page:1 });
  const movePrev = () => pagination({ page: page <= 1 ? paginationLength : page - 1 });
  const moveNext = () => pagination({ page: page >= paginationLength ? 1 : page + 1 });
  const moveLast = () => pagination({ page: paginationLength });

  const movePage = (number: number) => pagination({ page: number});

  return (
    <div className={'pg-cover flex justify-content-center '+className}>
      <div className={'pg flex align-items-center'}>
        <button className={'pg-move-first'} onClick={() => moveFirst()}>{'<<'}</button>
        <button className={'pg-move-prev'} onClick={() => movePrev()}>{'<'}</button>
        <div className="counts flex align-items-center">
          {Array.from(Array(paginationLength)).fill(1).map((_, idx) => {
            return <button key={idx} onClick={() => movePage(idx + 1)} className={'pg-item ' + (idx + 1 === page ? 'active' : '')}>{idx + 1}</button>;
          })}
        </div>
        <button className={'pg-move-next'} onClick={() => moveNext()}>{'>'}</button>
        <button className={'pg-move-last'} onClick={() => moveLast()}>{'>>'}</button>
=======
  const { paginationLength, page, className } = props;
  return (
    <div className={'pg-cover flex justify-content-center '+className}>
      <div className={'pg flex align-items-center'}>
        <button className={'pg-move-first'}>{'<<'}</button>
        <button className={'pg-move-prev'}>{'<'}</button>
        <div className="counts flex align-items-center">
          {Array.from(Array(paginationLength)).fill(1).map((_, idx) => {
            return <button key={idx} className={'pg-item ' + (idx + 1 === page ? 'active' : '')}>{idx + 1}</button>;
          })}
        </div>
        <button className={'pg-move-next'}>{'>'}</button>
        <button className={'pg-move-last'}>{'>>'}</button>
>>>>>>> ea18b396e5ae9996731714964db9bb61ac3416bf
      </div>
    </div>
  )
}
