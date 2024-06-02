import React from 'react';
import "./pagination.css";

export default function Pagination(props: any) {
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
      </div>
    </div>
  )
}
