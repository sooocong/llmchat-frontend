import React from 'react';
import { MainLayout } from '../../layout';
import { SearchResult } from '../../components';

const SearchPage = () => {
  return (
    <>
      <MainLayout>
        <SearchResult />
      </MainLayout>
    </>
  );
};

export { SearchPage };
