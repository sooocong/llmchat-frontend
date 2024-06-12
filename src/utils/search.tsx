import React from 'react';

export const highlightMatch = (
  text: string,
  query: string,
  styles: string | undefined
) => {
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
    '---', // horizontal rule
    // '[-*+]', // unordered list
    // '\\d+\\.', // ordered list
  ];

  const queryPattern = new RegExp(`(${query})`, 'gi');
  const parts = text.split(queryPattern);

  return parts.map((part: string, index: number) => {
    if (part.toLowerCase() === query.toLowerCase()) {
      return (
        <span key={index} className={styles}>
          {part}
        </span>
      );
    }

    const subParts = part.split(
      new RegExp(`(${markdownPatterns.join('|')})`, 'gi')
    );
    return subParts
      .map((subPart: string) => {
        if (new RegExp(markdownPatterns.join('|')).test(subPart)) {
          return '';
        }
        return subPart;
      })
      .join('');
  });
};
