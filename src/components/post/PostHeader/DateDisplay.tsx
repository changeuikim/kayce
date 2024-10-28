import { formatDate } from '@/lib/dateUtils';

type DateDisplayProps = {
  date: string;
  modifiedDate?: string;
};

const DateDisplay = ({ date, modifiedDate }: DateDisplayProps) => {
  const isModified = modifiedDate && modifiedDate !== date;
  const dateToShow = isModified ? modifiedDate : date;
  const dateLabel = isModified ? '최종 수정일' : '작성일';

  return (
    <time className="text-sm text-red-800" title={`${dateLabel}: ${formatDate(dateToShow)}`}>
      {formatDate(dateToShow)}
    </time>
  );
};

export default DateDisplay;
