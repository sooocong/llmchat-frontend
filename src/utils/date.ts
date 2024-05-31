export const isoToCustomFormat = (isoDate: Date) => {
  const year = isoDate.toLocaleDateString('en-US', {
    year: 'numeric',
  });
  const month = isoDate.toLocaleDateString('en-US', {
    month: '2-digit',
  });
  const day = isoDate.toLocaleDateString('en-US', {
    day: '2-digit',
  });

  return `${year}.${month}.${day}`;
}

export const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};